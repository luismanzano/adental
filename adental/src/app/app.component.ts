import { Component } from '@angular/core';


import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestoreModule} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adental';


  constructor(
    public adentalDB: AngularFireDatabase,
    public firestore: AngularFirestoreModule){

  }
}
