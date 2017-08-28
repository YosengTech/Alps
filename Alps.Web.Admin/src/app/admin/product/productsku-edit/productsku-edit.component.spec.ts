import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductskuEditComponent } from './productsku-edit.component';

describe('ProductskuEditComponent', () => {
  let component: ProductskuEditComponent;
  let fixture: ComponentFixture<ProductskuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductskuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductskuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
