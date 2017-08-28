import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlpsSelectorModalComponent } from './alps-selector-modal.component';

describe('AlpsSelectorModalComponent', () => {
  let component: AlpsSelectorModalComponent;
  let fixture: ComponentFixture<AlpsSelectorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlpsSelectorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlpsSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
