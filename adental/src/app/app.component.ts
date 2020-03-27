import { Component } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestoreModule} from "@angular/fire/firestore";
import {RouterOutlet} from "@angular/router";
import {fader} from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ // <-- add your animations here
    fader
  ]
})
export class AppComponent {
  title = 'adental';


  constructor(
    public adentalDB: AngularFireDatabase,
    public firestore: AngularFirestoreModule){

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
