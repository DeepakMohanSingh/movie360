import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildCardRouteHandlerComponent } from './wild-card-route-handler.component';

describe('WildCardRouteHandlerComponent', () => {
  let component: WildCardRouteHandlerComponent;
  let fixture: ComponentFixture<WildCardRouteHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WildCardRouteHandlerComponent]
    });
    fixture = TestBed.createComponent(WildCardRouteHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
