import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MongoService } from '../mongo.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  outMsg: any; cId: any; wDay: any; prof: any;
  outRec: any = [];
  constructor(private mongo: MongoService) {
    this.retrieve()
   }
  
  retrieve() {
    this.mongo.retrieve().subscribe(data => {
    this.outRec = data;
    this.outMsg = this.outRec.length + ' records retrieved';
    console.log(this.outRec)
    },
    (err: HttpErrorResponse) => {
    console.log(err.message);
    this.outMsg = err.message;
    });
    }

}
