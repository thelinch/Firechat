import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { persona } from '../modelos/persona';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  onLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }
  onCreateUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  getAuth(): AngularFireAuth {
    return this.afAuth

  }
}
