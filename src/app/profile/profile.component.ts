import { Component, OnInit } from '@angular/core';
import { getUser } from '../helpers/helper.functions';


export interface Details {
  username: string;
  first: string;
  last: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['username', 'first', 'last', 'email'];
  dataSource: any;
  user:any;
  constructor() { }

  ngOnInit(): void {
    this.user = getUser();
    this.dataSource = [
      {username: this.user.username, first: this.user.firstName, last: this.user.lastName, email: this.user.email},
    ];
  }


}
