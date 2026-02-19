import { users } from "../db/schema"; // Type only if possible, but actually we define types manually to avoid importing schema in frontend bundle if schema uses server-only deps (which it mostly doesn't, but let's be safe)

// Types matching API response
export interface User {
    id: string;
    email: string;
    name?: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    user: User;
    token: string;
    error?: string;
}

// TOGGLE THIS FOR REAL API vs MOCK
// Changed to FALSE to use real database
const USE_MOCK = false;

export const AuthService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (email === 'erro@teste.com') {
                        resolve({ user: {} as any, token: '', error: 'Credenciais inválidas' });
                    } else if (email === 'admin@clinicflow.com') {
                        resolve({
                            user: {
                                id: 'admin-user-id',
                                email: email,
                                name: 'Master Admin',
                                role: 'admin'
                            },
                            token: 'mock-admin-token'
                        });
                    } else {
                        resolve({
                            user: {
                                id: 'mock-user-id',
                                email: email,
                                name: 'Dr. Mock',
                                role: 'user'
                            },
                            token: 'mock-jwt-token'
                        });
                    }
                }, 1000);
            });
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            return await res.json();
        } catch (e) {
            return { user: {} as any, token: '', error: 'Erro de conexão' };
        }
    },

    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        user: {
                            id: 'new-mock-id',
                            email: email,
                            name: name,
                            role: 'user'
                        },
                        token: 'mock-jwt-token-new'
                    });
                }, 1500);
            });
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            return await res.json();
        } catch (e) {
            return { user: {} as any, token: '', error: 'Erro de conexão' };
        }
    }
};
