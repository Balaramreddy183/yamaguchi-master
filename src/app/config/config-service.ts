import { LOCATION_INITIALIZED } from "@angular/common";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiBaseUrl: string | undefined;
}

export function preInitServiceFactory(
  initService: PreInitService,
  injector: Injector
) {
  return () =>
    new Promise((resolve) =>
      injector
        .get(LOCATION_INITIALIZED, Promise.resolve(undefined))
        .then(() => resolve(initService.onInit()))
    );
}

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private settingsSource: BehaviorSubject<ConfigService> =
    new BehaviorSubject<ConfigService>(new ConfigService());

  settings: Observable<Readonly<ConfigService>> = this.settingsSource.asObservable();

  setSettings(settings: Partial<ConfigService>) {
    const updatedConfig = { ...this.settingsSource.value, ...settings };
    this.settingsSource.next(updatedConfig);
  }

  getSettings(): Readonly<ConfigService> {
    return this.settingsSource.value;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PreInitService {
  constructor(
    private httpBackend: HttpBackend,
    private appSettingsService: AppSettingsService
  ) { }

  async onInit(): Promise<boolean> {
    const http = new HttpClient(this.httpBackend);
    try {
      const config = await http
        .get<ConfigService>('./assets/config.json')
        .toPromise();
      if (config) {
        this.appSettingsService.setSettings(config);
      }
      return true;
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}