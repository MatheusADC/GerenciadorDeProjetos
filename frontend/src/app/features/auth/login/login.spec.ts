import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { of, throwError } from 'rxjs';
import { AuthManager } from '../../../core/services/auth-manager';
import { Router } from '@angular/router';

describe('Login Component', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;

    const authManagerMock = {
        login: vi.fn().mockReturnValue(of({ token: '123', user: { nome: 'Teste' } })),
        logout: vi.fn(),
        isAuthenticated: vi.fn().mockReturnValue(false),
    };

    const routerMock = {
        navigate: vi.fn(),
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        await TestBed.configureTestingModule({
            imports:[Login],
            providers: [
                { provide: AuthManager, useValue: authManagerMock },
                { provide: Router, useValue: routerMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('deve criar um componente com sucesso', () => {
        expect(component).toBeTruthy();
    });

    it('deve navegar para o /dashboard quando o login for um sucesso', () => {
        const email = 'matheus@exemplo.com'

        component.login();

        expect(authManagerMock.login).toHaveBeenCalledWith(email);
        expect(authManagerMock.login).toHaveBeenCalledTimes(1);

        expect(routerMock.navigate).toHaveBeenCalledWith(['[/dashboard]']);
    });

    it('deve exibir a mensagem de erro e parar o loading quando o login falhar', () => {
        authManagerMock.login.mockReturnValueOnce(throwError(() => new Error('Não autorizado')));
       
        const email = 'matheus@exemplo.com'

        component.login();

        expect(authManagerMock.login).toHaveBeenCalledWith(email);
        expect(authManagerMock.login).toHaveBeenCalledTimes(1);

        expect(routerMock.navigate).not.toHaveBeenCalled();

        expect(component.error).toBe('Email inválido. Tente felipe@example.com ou ana@example.com');
        expect(component.isLoading).toBe(false);
    });
});
