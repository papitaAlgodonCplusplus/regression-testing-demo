// Authentication tests - existing tests that should always pass
import { describe, test, expect, beforeEach } from '@jest/globals';
import { AuthService } from '../../src/auth.js';

describe('AuthService - Regression Tests', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('User Registration', () => {
    test('should register a new user with valid credentials', () => {
      const user = authService.register('john', 'password123', 'john@example.com');

      expect(user).toEqual({
        username: 'john',
        email: 'john@example.com'
      });
    });

    test('should reject registration with existing username', () => {
      authService.register('john', 'password123', 'john@example.com');

      expect(() => {
        authService.register('john', 'password456', 'john2@example.com');
      }).toThrow('User already exists');
    });

    test('should reject short passwords', () => {
      expect(() => {
        authService.register('john', '12345', 'john@example.com');
      }).toThrow('Password must be at least 6 characters');
    });

    test('should reject invalid email format', () => {
      expect(() => {
        authService.register('john', 'password123', 'invalid-email');
      }).toThrow('Invalid email format');
    });
  });

  describe('User Login', () => {
    beforeEach(() => {
      authService.register('john', 'password123', 'john@example.com');
    });

    test('should login with correct credentials', () => {
      const session = authService.login('john', 'password123');

      expect(session).toHaveProperty('sessionId');
      expect(session).toHaveProperty('username', 'john');
      expect(session.sessionId).toBeTruthy();
    });

    test('should reject login with wrong password', () => {
      expect(() => {
        authService.login('john', 'wrongpassword');
      }).toThrow('Invalid credentials');
    });

    test('should reject login for non-existent user', () => {
      expect(() => {
        authService.login('nonexistent', 'password123');
      }).toThrow('Invalid credentials');
    });
  });

  describe('Session Management', () => {
    let sessionId;

    beforeEach(() => {
      authService.register('john', 'password123', 'john@example.com');
      const session = authService.login('john', 'password123');
      sessionId = session.sessionId;
    });

    test('should validate active session', () => {
      expect(authService.isAuthenticated(sessionId)).toBe(true);
    });

    test('should get username from session', () => {
      expect(authService.getUsername(sessionId)).toBe('john');
    });

    test('should logout successfully', () => {
      const result = authService.logout(sessionId);
      expect(result).toBe(true);
      expect(authService.isAuthenticated(sessionId)).toBe(false);
    });

    test('should reject invalid session', () => {
      expect(authService.isAuthenticated('invalid-session')).toBe(false);
    });
  });
});
