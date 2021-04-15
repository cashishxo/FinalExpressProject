import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor(private http: HttpClient) { 

  }

  retrieve(){
    return this.http.get('http://127.0.0.1:8887/retrieve/',{})
  }

  insertCenterInfo(params) {
    console.log("in the mongo service")
    console.log(params)
    return this.http.post('http://127.0.0.1:8887/insertCenterInfo/',{ params });
    }
  retrieveCenterInfo() {
  return this.http.get('http://127.0.0.1:8887/retrieveCenterInfo/',{});
  }
  updateCenterInfo(params) {
    return this.http.put('http://127.0.0.1:8887/updateCenterInfo/', { params });
    }
    deleteCenterInfo(params) {
    return this.http.delete('http://127.0.0.1:8887/deleteCenterInfo/',{params});
    }
    removeCenterInfo() {
    return this.http.delete('http://127.0.0.1:8887/removeCenterInfo/',{});
    }
    mongoExport() {
      return this.http.get('http://127.0.0.1:8887/nodeExport/');
      }
}
