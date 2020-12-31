import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'description', 'status', 'type', 'timeSubmitted', 'author', 'timeResolved', 'resolver','buttons'];
  //dataSource: [];
  tickets: Reimbursement;
  image: any;
  
  constructor(private service: ReimbursementService){}

  ngOnInit(): void {
    this.service.getAll().subscribe(response =>{
      this.tickets = response;
    })
  }

}
