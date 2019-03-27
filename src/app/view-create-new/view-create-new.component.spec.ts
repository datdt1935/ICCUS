import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreateNewComponent } from './view-create-new.component';

describe('ViewCreateNewComponent', () => {
  let component: ViewCreateNewComponent;
  let fixture: ComponentFixture<ViewCreateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
