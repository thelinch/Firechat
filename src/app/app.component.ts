import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { SwUpdate } from "@angular/service-worker";
import { MessagingService } from "./services/messaging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "firechat";
  message;
  constructor(
    db: AngularFirestore,
    private swUpdate: SwUpdate,
    private messagingService: MessagingService
  ) {
    const userId = "user001";
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe({
        next: () => {
          if (confirm("Hay una nueva version disponible.Desae Instalarlo?")) {
            window.location.reload();
          }
        }
      });
    }
  }
}
