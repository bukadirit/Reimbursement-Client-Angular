import { Reimbursement } from './../models/reimbursement';
import { User } from "../models/user";

export const getUser = () =>{
    let user: {};
    return user = {
        id: parseInt(localStorage.getItem('id')),
        username: localStorage.getItem('username'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email: localStorage.getItem('email')
    }
}

export const setUser = (user: User) =>{
    localStorage.setItem("username", user.username.toString());
      localStorage.setItem("email", user.email.toString());
      localStorage.setItem("id", user.id.toString());
      localStorage.setItem("role", user.role.toString());
      localStorage.setItem("firstName", user.firstName.toString());
      localStorage.setItem("lastName", user.lastName.toString());
}

export const removeUser = () =>{
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
}

export const validateLogin = (username: string, password:string) =>{
    if(username != undefined && password != undefined){
        return true;
    }else{
        return false;
    }
}

export const getErrors = (error: Response) =>{
    if(error.status){
        switch (error.status) {
            case 400:
                return 'The Request You Sent Is Invalid. Please Fill out All Required Fields'
            case 403:
                return 'The Username or Password is Incorrect';
            case 401:      
                return 'You Are Not Authorized To Access This Resource';
            case 404:    
                return 'The Resource or Page Was Not Found';
            case 500:     
                return 'A Server Error Has Occurred. Please Try Again Later.';
            default:
                return 'An Unexpected Error Has Occurred.'
          }
    }
    else{
        return 'An Unexpected Error Has Occurred.'
    }
}

export const validateReimbForm = (reimb: Reimbursement) =>{
    if(!reimb.amount || !reimb.description || !reimb.type)
        return false;
        
    return true;
}