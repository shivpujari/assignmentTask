import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDialogComponent } from './mock-dialog.component';

describe('MockDialogComponent', () => {
  let component: MockDialogComponent;
  let fixture: ComponentFixture<MockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
