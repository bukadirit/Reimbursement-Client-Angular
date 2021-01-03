import { validateReimbForm } from './../helpers/helper.functions';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getErrors, getUser } from '../helpers/helper.functions';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Reimbursement } from '../models/reimbursement';
import { User } from '../models/user';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent{
  private newImage: any;
  private confirm: boolean = false;
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
    private service: ReimbursementService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router)
    {
      this.user = getUser();
    };

  onSubmit(){
    if(!this.newImage){
      if(this.confirm){
        if(this.prepareReimb()){
          this.service.postReimbursementWithNoReceipt(this.reimb)
          .subscribe(response =>{
          this.openSnackBar('The Request Has Been Submitted!');
          this.router.navigate(['/portal']);
          },
          (error: Response )=>{
          const errMsg = getErrors(error);
          this.openSnackBar(errMsg);
          });
        }else{
          this.router.navigate(['/create-ticket']);
          this.openSnackBar('Please Fill out All Required Fields');
        }
      }else{
        this.openDialog()
      }
    }else{
      if(this.prepareReimb()){
        this.service.postReimbursement(this.reimb, this.newImage)
        .subscribe(response =>{
        this.openSnackBar('The Request Has Been Submitted!');
        this.router.navigate(['/portal']);
        },
        (error: Response )=>{
        const errMsg = getErrors(error);
        this.openSnackBar(errMsg);
        });
      }else{
        this.router.navigate(['/create-ticket']);
        this.openSnackBar('Please Fill out All Required Fields');
      }
    }
  }

  onSelectedFilesChanged(event: any){
    if(event){
      this.newImage = event[0];
    }else{
      this.newImage = null;
    }
  }

  openDialog() {
    const ref = this.dialog.open(ImageDialogComponent, {
      width: '40vw',
      height: '20vh'
    });

    ref.afterClosed().subscribe(result => {
      if(result){
        this.confirm = true;
        this.onSubmit();
      }
    });
  }

  prepareReimb(){
    this.reimb.id = 0;
    this.reimb.status = "Pending"; 
    this.reimb.type = this.selectedType;
    this.reimb.author = this.user;
    return validateReimbForm(this.reimb);
  }

  openSnackBar(msg:string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'start',
      panelClass: 'purple-snackbar',
      
    });
  }
}
