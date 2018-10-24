import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationIndexComponent } from './location-index.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmMap, AgmInfoWindow, AgmMarker } from '@agm/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LocationIndexComponent', () => {
  let component: LocationIndexComponent;
  let fixture: ComponentFixture<LocationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationIndexComponent, AgmMap, AgmInfoWindow, AgmMarker ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
