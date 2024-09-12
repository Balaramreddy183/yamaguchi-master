import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDashboardComponent } from './homepage-dashboard';

describe('HomeComponent', () => {
  let component: HomepageDashboardComponent;
  let fixture: ComponentFixture<HomepageDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
