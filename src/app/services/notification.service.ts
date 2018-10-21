import { Injectable } from '@angular/core';
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
PNotify.defaults.styling = 'bootstrap3';
PNotify.defaults.icons = 'bootstrap3';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  notificationType = {
    error : "ERROR",
    informative: "INFORMATIVE", //Blue
    notice: "NOTICE", //Yellow
    success: "SUCCESS" //Green
  }

  constructor() {
    PNotifyButtons;
  }

  handleError(err){
    if(err.message){
      PNotify.error({
        text: err.message
      });
    }
  }

  printMessage(message, type){
    switch(type){
      case "ERROR":
        this.printErrorMessage(message);
        break;
      case "INFORMATIVE":
        this.printInformativeMessage(message);
        break;
      case "NOTICE":
        this.printNoticeMessage(message);
        break;
      case "SUCCESS":
        this.printSuccessMessage(message);
        break;
    }
  }

  printErrorMessage(message){
    PNotify.error({
      title: "Try again",
      text: message
    });
  }

  printNoticeMessage(message){
    PNotify.notice({
      title: "We're having some issues",
      text: message
    });
  }

  printInformativeMessage(message){
    PNotify.info({
      title: "Just so you know",
      text: message
    });
  }

  printSuccessMessage(message){
    PNotify.success({
      title: "Congratulations!",
      text: message
    });
  }
}
