import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,  RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../services/models/userLogin';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';
import { LoadingService } from '../models/loadingService';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  public userRegister : UserLogin = new UserLogin();
 

  constructor( private userService : UserService, private router: Router, private loadingService: LoadingService ) {}

  public LoginUser(){

    this.loadingService.show();

    this.userService.loginUser(this.userRegister).subscribe({
      next: response => {
        this.loadingService.hide();
        console.log("Logged successful: ", response);
        AuthenticationOrchestrator.signaller.next(true);
        //alert("Successfuly logged new user");
      
        if (response && response.accessToken) {
          localStorage.setItem('CURRENT_TOKEN', response.accessToken);
        }
        
        this.router.navigate(['/item-list']);
        

        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        this.loadingService.hide();
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }

}


