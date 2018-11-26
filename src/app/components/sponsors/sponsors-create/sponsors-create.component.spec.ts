import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsCreateComponent } from './sponsors-create.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SponsorsCreateComponent', () => {
  let component: SponsorsCreateComponent;
  let fixture: ComponentFixture<SponsorsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsCreateComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
