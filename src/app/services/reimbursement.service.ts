import { Reimbursement } from './../models/reimbursement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  private baseUrl: string ='http://localhost:8080/ers/api/v1/reimbursements/';
  form: FormGroup;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private fb: FormBuilder){
    this.form =this.fb.group({
      reimbursement: null,
      image: null
    });
  }

  getAll() {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getForOne(){
    return this.http.get(this.baseUrl + 'author/' + localStorage.getItem('id'));
  }

//   postReimbursement(r: any, f: any){
//     this.form.patchValue({
//       reimbursement: JSON.stringify(r),
//       image: f
//     });
//     let formData = new FormData();
//     formData.append("reimbursement", this.form.get('reimbursement').value);
//     formData.append("image", this.form.get('image').value);
//     return this.http.post(this.baseUrl, formData, this.httpOptions);
//   }
postReimbursementWithNoReceipt(reimb: Reimbursement){
  return this.http.post(this.baseUrl, reimb, {withCredentials: true}); 
}

postReimbursementImage(image: any, id: number){
  let formData = new FormData();
  formData.append("image", image);

  return this.http.post(
    this.baseUrl + `${id}/receipt` , 
    formData, 
    {withCredentials: true}); 
}

postReimbursement(reimb: Reimbursement, image: any){
    const data = new Blob([JSON.stringify(reimb)], {
      type: 'application/json',
    });

    let formData = new FormData();
    formData.append("reimbursement", data);
    formData.append("image", image);
    return this.http.post(this.baseUrl, formData, {withCredentials: true});
  }

  updateReimbursement(data: any, id: string){
    return this.http.put(this.baseUrl + id, data, {withCredentials: true});
  }
 }
