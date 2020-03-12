import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe( usersPromise => {
      // payload doc
      console.log(usersPromise);
      const longitude = usersPromise.length;
      this.users = usersPromise;

      // for (let i = 0; i <= longitude; i++) {
      //   console.log(usersPromise[i]);
      //     this.users.push(usersPromise[i].payload.doc.data());
      // }


    });
  }

  deleteUser(id: string) {
    this.authService.deleteUser(id);
  }

  changeUser(id: string, newType: string) {
    this.authService.changeUser(id, newType);
  }

}
