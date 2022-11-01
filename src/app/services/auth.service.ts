import { Injectable } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  constructor(private auth: Auth) {}

  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }
  //login with email
  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }
  //login with google provider
  GoogleAuth() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  //login with facebook provider
  FacebookAuth() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  // Email verification when new user registers
  async sendVerificationMail() {
    await sendEmailVerification(this.auth.currentUser);
  }
  // recover password mail
  async recoverPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {
      return null;
    }
  }

  get isLoggedIn(): boolean {
    const user = this.auth.currentUser;
    // const user = this.auth.currentUser;
    return user !== null ? true : false;
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isEmailVerified(): boolean {
    const user = this.auth.currentUser;
    return user.emailVerified !== false ? true : false;
  }

  logout() {
    return signOut(this.auth);
  }

  setUser(user: User) {
    return (this.user = user);
  }
}
