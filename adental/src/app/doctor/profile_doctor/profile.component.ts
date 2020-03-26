import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponentDoctor implements OnInit {

  mainUser = {
    name: '',
    lastname: '',
    username: '',
    type: '',
    id: ''
  };

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.mainUser.id = localStorage.getItem('id');
    this.mainUser.name = localStorage.getItem('name');
    this.mainUser.lastname = localStorage.getItem('lastname');
    this.mainUser.username = localStorage.getItem('username');
    this.mainUser.type = localStorage.getItem('type');
    console.log(localStorage.getItem('id'));
    console.log(this.mainUser.id);
    console.log('QUE PASA CON ESTO');
  }

  workBlock(day: number, avl: boolean) {


    this.authService.saveBlock(this.mainUser.id, day, avl);


    alert('Esta funcionando el workblock ' + day);
  }

}
