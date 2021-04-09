import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header/header.component';
import { authService } from './authentication/auth.service';

describe('AppComponent', () => {
  let service: authService
  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      imports: [ RouterTestingModule  ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [authService]
    }).compileComponents();
    service = TestBed.inject(authService)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain div with class name container_fluied', () => {
    const fixture = TestBed.createComponent(AppComponent);
    service.autoLogin()
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container_fluied'))
    .toBeTruthy();
  });
});
