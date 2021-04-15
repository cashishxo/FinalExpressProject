import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { MongoService } from '../mongo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  outMsg: any; date: any; time: any; ohip: any; email: any;
  outRec: any = [];
  constructor(private route: ActivatedRoute, private mongo: MongoService, public actionSheetController: ActionSheetController) { }
  data: any
  ngOnInit() {
    this.data = this.route.snapshot.params;
    console.log(this.data)
  }
  goAdd() {
    console.log("go add is clicked")
    const params = {
      location_id: this.data.location_id, date: this.date, time: this.time,
      ohip: this.ohip, email: this.email
    };
    this.mongo.insertCenterInfo(params)
      .subscribe(data => {
        this.outMsg = 'Record added.';
        this.outRec = [];
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          this.outMsg = err.message;
        });
  }

  goClear() {
    console.log("button go clear is clicked")
    this.date = "";
    this.time = "";
    this.ohip = "";
    this.email = "";
  }

  goRetrieve() {
    this.mongo.retrieveCenterInfo()
      .subscribe(data => {
        this.outRec = data;
        this.outMsg = this.outRec.length + ' records retrieved';
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          this.outMsg = err.message;
        });
  }


  goUpdate() {
    console.log("go update is clicked")
    const params = {
      location_id: this.outRec.location_id, date: this.date, time: this.time,
      ohip: this.ohip, email: this.email
    };
    this.mongo.updateCenterInfo(params)
      .subscribe(data => {
        this.outMsg = 'Record added.';
        this.outRec = [];
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          this.outMsg = err.message;
        });
  }
  goDelete() {
    console.log("delete button is clicked")
    const params = { location_id: this.outRec.location_id }
    this.mongo.deleteCenterInfo(params)
      .subscribe(data => {
        this.outMsg = 'Record added.';
        this.outRec = [];
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
          this.outMsg = err.message;
        });
  }

  clickit() {
    this.date = this.outRec.date;
    this.time = this.outRec.time;
    this.ohip = this.outRec.ohip;
    this.email = this.outRec.emai;
  }

  goExport() {
    this.outRec = [];
    this.mongo.mongoExport()
      .subscribe(data => {
        this.outMsg = 'File exported';
      },
        (err: HttpErrorResponse) => {
          this.outMsg = err.error.text;
        });
  }
  goDeleteAll() {
    this.mongo.removeCenterInfo().subscribe(
      data => {
        this.outMsg = 'Record added.';
        this.outRec = [];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.outMsg = err.message;
      }
    );
  }
}
