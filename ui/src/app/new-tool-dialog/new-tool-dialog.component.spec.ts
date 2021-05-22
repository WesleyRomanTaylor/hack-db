import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToolDialogComponent } from './new-tool-dialog.component';

describe('NewToolDialogComponent', () => {
  let component: NewToolDialogComponent;
  let fixture: ComponentFixture<NewToolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewToolDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewToolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
