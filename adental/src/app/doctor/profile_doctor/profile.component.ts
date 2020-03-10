import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponentDoctor implements OnInit {

  mainUser = this.authService.mainUser;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

}
