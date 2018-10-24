import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsIndexComponent } from './sponsors-index.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SponsorsIndexComponent', () => {
  let component: SponsorsIndexComponent;
  let fixture: ComponentFixture<SponsorsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsIndexComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
