import { Component, OnInit } from '@angular/core';
import { getUser } from '../helpers/helper.functions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor() { }

  ngOnInit(): void {
    this.user = getUser();
  }

}
