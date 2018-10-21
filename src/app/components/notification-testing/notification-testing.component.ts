import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-testing',
  templateUrl: './notification-testing.component.html',
  styleUrls: ['./notification-testing.component.css']
})
export class NotificationTestingComponent implements OnInit {

  message = "";

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  printMessageSuccess(){
    this.notificationService.printMessage(this.message, this.notificationService.notificationType.success);
  }

  printMessageInfo(){
    this.notificationService.printMessage(this.message, this.notificationService.notificationType.informative);
  }

  printMessageError(){
    this.notificationService.printMessage(this.message, this.notificationService.notificationType.error);
  }

  printMessageAlert(){
    this.notificationService.printMessage(this.message, this.notificationService.notificationType.notice);
  }

}
