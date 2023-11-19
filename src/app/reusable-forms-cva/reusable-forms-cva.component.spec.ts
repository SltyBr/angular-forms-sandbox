import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableFormsCvaComponent } from './reusable-forms-cva.component';

describe('ReusableFormsCvaComponent', () => {
  let component: ReusableFormsCvaComponent;
  let fixture: ComponentFixture<ReusableFormsCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReusableFormsCvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableFormsCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
