import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLinkComponent } from './nav-link.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavLinkComponent', () => {
  let component: NavLinkComponent;
  let fixture: ComponentFixture<NavLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLinkComponent);
    component = fixture.componentInstance;
    component.navLink = { text: 'Fake', url: '/fake-link' }; // Fake link
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
