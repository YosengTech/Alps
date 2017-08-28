import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductskuListComponent } from './productsku-list.component';

describe('ProductskuListComponent', () => {
  let component: ProductskuListComponent;
  let fixture: ComponentFixture<ProductskuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductskuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductskuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
