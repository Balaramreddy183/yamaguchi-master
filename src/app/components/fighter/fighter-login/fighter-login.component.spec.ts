import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterLoginComponent } from './fighter-login.component';

describe('FighterLoginComponent', () => {
  let component: FighterLoginComponent;
  let fixture: ComponentFixture<FighterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FighterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
