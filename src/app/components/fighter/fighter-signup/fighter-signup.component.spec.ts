import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterSignupComponent } from './fighter-signup.component';

describe('FighterSignupComponent', () => {
  let component: FighterSignupComponent;
  let fixture: ComponentFixture<FighterSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FighterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
