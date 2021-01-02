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
  private user: User = new User();
  public reimb = new Reimbursement();
  public selectedType: any;
  public types = [
    { value: 0, viewValue: 'Lodging' },
    { value: 1, viewValue: 'Travel' },
    { value: 2, viewValue: 'Food' },
    { value: 3, viewValue: 'Other' },
  ];
  
  constructor(
    private service: ReimbursementService)
    {
      this.user = getUser();
    };

  onSubmit(){
    this.reimb.id = 0;
    this.reimb.status = "Pending"; 
    this.reimb.type = this.selectedType;
    this.reimb.author = this.user;
  
    this.service.postReimbursement(this.reimb, this.newImage).subscribe();
  }

  onSelectedFilesChanged(event: any){
    if(event){
      this.newImage = event[0];
    }
  }

  onUploadClicked(event: any){}

  ngOnInit(): void {
  }



}
