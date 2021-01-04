import { Component, OnInit, ViewChild} from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'amount', 'description', 'receipt', 'status', 'type', 'timeSubmitted', 'author', 'timeResolved', 'resolver','buttons'];
  public dataSource = new MatTableDataSource<Reimbursement>(); 
  
  constructor(
    private service: ReimbursementService, 
    public dialog: MatDialog){}

    @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getAll().subscribe(response => {
      this.dataSource = new MatTableDataSource<Reimbursement>(response);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  approveReimb(reimb: Reimbursement){
    let data = {
      status: 1,
      resolver: {
        id: parseInt(localStorage.getItem('id'))
      }
    }
      this.service.updateReimbursement(data, reimb.id.toString())
      .subscribe(response => this.refresh());
  }

  refresh(){
    this.service.getAll()
    .subscribe(response => {
      this.dataSource = new MatTableDataSource<Reimbursement>(response)
      this.dataSource.paginator = this.paginator;
    })
  }

  denyReimb(reimb: Reimbursement){
    let data = {
      status: 2,
      resolver: {
        id: parseInt(localStorage.getItem('id'))
      }
    }
      this.service.updateReimbursement(data, reimb.id.toString())
      .subscribe(response => this.refresh());
  }
}
