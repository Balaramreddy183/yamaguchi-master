import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {
    private settings: any;

    constructor(private http: HttpClient) {}

    loadSettings(): Observable<any> {
        return this.http.get('/assets/config.json').pipe(
            map(settings => {
                this.settings = settings;
                return settings;
            })
        );
    }

    getSettings() {
        return this.settings;
    }
}