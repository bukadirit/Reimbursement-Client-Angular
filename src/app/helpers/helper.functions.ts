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