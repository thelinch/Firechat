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
  onLogin(email: string, password: string): Observable<boolean> {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(respuesta => {
        sessionStorage.setItem("loget", respuesta.user.uid)

        observer.next(true)
        observer.complete()
      }).catch(error => {
        observer.next(false)
      })
    })


  }
  onCreateUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  logout(): Observable<boolean> {
    return Observable.create(observer => {
      this.afAuth.auth.signOut().then(() => {
        sessionStorage.removeItem("loget")
        observer.next(true)
      }).catch(error => {
        observer.next(false)
      });

    })
  }
  getAuth(): AngularFireAuth {
    return this.afAuth

  }
  getCurrentUser(): User {
    return this.afAuth.auth.currentUser
  }
  isLogged(): boolean {
    if (this.afAuth.auth.currentUser) {
      return true
    }
    return false
  }
}
