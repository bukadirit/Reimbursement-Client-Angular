import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'description', 'receipt', 'status', 'type', 'timeSubmitted', 'timeResolved', 'resolver'];
  tickets: Reimbursement;
  
  constructor(private service: ReimbursementService,  public dialog: MatDialog){}

  ngOnInit(): void {
    this.service.getForOne().subscribe(response =>{
      this.tickets = response;
    })
  }

  openDialog(image: string) {
    this.dialog.open(ImageDialogComponent, {
      data: {
        name: image
      },
      width: '50vw',
      height: '60vh'
    });
  }
}
