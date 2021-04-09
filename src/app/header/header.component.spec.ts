import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { authService } from '../authentication/auth.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: authService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'authentication', redirectTo: ''}]
      )
      ],
      declarations: [ HeaderComponent ],
      providers:[authService]
    })
    .compileComponents();
    service = new authService(router)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.subscription = service.isAuthenticated.subscribe(res=>{
      component.isAuthenticated=res
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should not be authenticated ',()=>{
    service.isAuthenticated.next(false)
    expect(component.isAuthenticated).toBe(false)
  })

  it('should be authenticated ',()=>{
    service.isAuthenticated.next(true)
    expect(component.isAuthenticated).toBe(true)
  })

  it('should logout',fakeAsync(()=>{
    service.isAuthenticated.next(true)
    spyOn(component, 'onLogout');
    fixture.detectChanges();
    let a = fixture.nativeElement.querySelector("a.Logout")
    a.click();
    tick();
    expect(component.onLogout).toHaveBeenCalled()
  }))
});
