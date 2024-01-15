import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../services/models/userRegister';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,RouterModule, FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent   {
  
  

  public userRegister : UserRegister = new UserRegister();
 

  constructor( private userService : UserService ) {}


  public registerUser() : void{
    
    this.userService.addUser(this.userRegister).subscribe({
      next: response => {
        console.log("Added successful: ", response);
        alert("Successfuly added new user");
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }



}
