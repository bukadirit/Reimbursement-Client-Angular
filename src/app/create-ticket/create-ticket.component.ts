import { Component, OnInit } from '@angular/core';
import { getUser } from '../helpers/helper.functions';
import { Reimbursement } from '../models/reimbursement';
import { User } from '../models/user';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  private newImage: any;
  private reimb = new Reimbursement();
  private user: User = new User();
  
  constructor(private service: ReimbursementService){this.user = getUser();};

  onUpload(event: any){
    this.newImage = event.target.files[0];
    this.reimb.id = 0;
    this.reimb.amount= 999;
    this.reimb.description= "Who decided that?"
    this.reimb.status = "Pending";
    this.reimb.type = "Other";
    this.reimb.author = this.user;

    this.service.postReimbursement(this.reimb, this.newImage).subscribe();
  }
  ngOnInit(): void {
  }



}
