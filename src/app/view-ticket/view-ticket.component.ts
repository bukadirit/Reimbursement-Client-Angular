import { Component, OnInit } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'description', 'status', 'type', 'timeSubmitted', 'timeResolved', 'resolver'];
  //dataSource: [];
  tickets: Reimbursement;
  image: any;
  
  constructor(private service: ReimbursementService){}

  ngOnInit(): void {
    this.service.getForOne().subscribe(response =>{
      this.tickets = response;
    })
  }
}
