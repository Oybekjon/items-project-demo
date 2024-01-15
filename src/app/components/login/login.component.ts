import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../services/models/userLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  public userRegister : UserLogin = new UserLogin();
 

  constructor( private userService : UserService ) {}

  public LoginUser(){

    this.userService.loginUser(this.userRegister).subscribe({
      next: response => {
        console.log("Logged successful: ", response);
        alert("Successfuly logged new user");
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }

}


