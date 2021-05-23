import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewToolComponent } from './view-tool.component';

describe('ViewToolComponent', () => {
  let component: ViewToolComponent;
  let fixture: ComponentFixture<ViewToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
