import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlpsInlineEditComponent } from './alps-inline-edit.component';

describe('AlpsInlineEditComponent', () => {
  let component: AlpsInlineEditComponent;
  let fixture: ComponentFixture<AlpsInlineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlpsInlineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlpsInlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
