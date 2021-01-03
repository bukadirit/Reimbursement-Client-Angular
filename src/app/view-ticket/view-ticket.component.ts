import { Reimbursement } from './../models/reimbursement';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ReimbursementService } from '../services/reimbursement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrors } from '../helpers/helper.functions';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'description', 'receipt', 'status', 'type', 'timeSubmitted', 'timeResolved', 'resolver'];
  tickets: Reimbursement;
  private newImage: any;
  
  constructor(
    private service: ReimbursementService,  
    public dialog: MatDialog,
    private snackBar: MatSnackBar,){}

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
      height: '65%'
    });
  }

  onSelectedFilesChanged(event: any){
    if(event){
      this.newImage = event[0];
    }else{
      this.newImage = null;
    }
  }

  onUploadClicked(id: number){
    this.service.postReimbursementImage(this.newImage, id)
    .subscribe(response =>{
      this.openSnackBar('The Receipt Has Been Submitted!');
      this.refresh();
    },
    (error: Response )=>{
      const errMsg = getErrors(error);
      this.openSnackBar(errMsg);
      });
  }

  openSnackBar(msg:string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'purple-snackbar',
      
    });
  }

  refresh(){
    this.service.getForOne().subscribe(response =>{
      this.tickets = response;
    },
    (error: Response )=>{
      const errMsg = getErrors(error);
      this.openSnackBar(errMsg);
      });
  }
}
