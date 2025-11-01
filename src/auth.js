// Authentication module - existing functionality
export class AuthService {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  register(username, password, email) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    this.users.set(username, { password, email });
    return { username, email };
  }

  login(username, password) {
    const user = this.users.get(username);

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const sessionId = Math.random().toString(36).substring(7);
    this.sessions.set(sessionId, username);

    return { sessionId, username };
  }

  logout(sessionId) {
    return this.sessions.delete(sessionId);
  }

  isAuthenticated(sessionId) {
    return this.sessions.has(sessionId);
  }

  getUsername(sessionId) {
    return this.sessions.get(sessionId);
  }
}
