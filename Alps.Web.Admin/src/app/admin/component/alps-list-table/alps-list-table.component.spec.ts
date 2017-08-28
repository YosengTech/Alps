import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlpsListTableComponent } from './alps-list-table.component';

describe('AlpsListTableComponent', () => {
  let component: AlpsListTableComponent;
  let fixture: ComponentFixture<AlpsListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlpsListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlpsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
