import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tickets: any;
  image: any;
  
  constructor(private service: ReimbursementService){}

  ngOnInit(): void {
    this.service.getAll().subscribe(response =>{
      this.tickets = response;
      console.log(this.tickets)
    })
  }

}
