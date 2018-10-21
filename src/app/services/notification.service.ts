import { Injectable } from '@angular/core';
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
PNotify.defaults.styling = 'bootstrap3';
PNotify.defaults.icons = 'bootstrap3';

enum NotificationType{
  Error = "ERROR", //Red
  Informative = "INFORMATIVE", //Blue
  Notice = "NOTICE", //Yellow
  Success = "SUCCESS" //Green
}

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

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
      text: message
    });
  }

  printNoticeMessage(message){
    PNotify.notice({
      text: message
    });
  }

  printInformativeMessage(message){
    PNotify.info({
      text: message
    });
  }

  printSuccessMessage(message){
    PNotify.success({
      text: message
    });
  }
}
