import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mainUser = this.authService.mainUser;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

}
