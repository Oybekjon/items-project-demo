import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoDemoComponent } from './kendo-demo.component';

describe('KendoDemoComponent', () => {
  let component: KendoDemoComponent;
  let fixture: ComponentFixture<KendoDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KendoDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KendoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
