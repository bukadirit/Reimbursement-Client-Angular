import { Component, OnInit } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';
import {MatDialog} from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'description', 'receipt', 'status', 'type', 'timeSubmitted', 'author', 'timeResolved', 'resolver','buttons'];
  tickets: Reimbursement;
  image: any;
  
  constructor(private service: ReimbursementService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.service.getAll().subscribe(response =>{
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
