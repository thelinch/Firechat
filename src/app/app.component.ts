import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'firechat';
  constructor(db: AngularFirestore, private swUpdate: SwUpdate) {
  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe({
        next: () => {
          if (confirm("Hay una nueva version disponible.Desae Instalarlo?")) {
            window.location.reload()
          }
        }
      })
    }
  }
}
