import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDisplayComponent } from './progress-display.component';

describe('ProgressDisplayComponent', () => {
  let component: ProgressDisplayComponent;
  let fixture: ComponentFixture<ProgressDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
