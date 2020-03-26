import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then( () => {
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');
      localStorage.removeItem('username');
      localStorage.removeItem('type');
    });
  }

}
