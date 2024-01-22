import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,  RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../services/models/userLogin';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';
import { LoadingService } from '../models/loadingService';
import { LoadingOrchestrator } from '../models/loading-orchestrator';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterModule, FormsModule,CommonModule,LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  public userLogin : UserLogin = new UserLogin();
  public isLoading : boolean = false;
  public isValidEmail : boolean = false;
  public isValidPassword : boolean = false;
 

  constructor( private toastr: ToastrService,private userService : UserService, private router: Router, private loadingService: LoadingService ) {}

  public LoginUser(){

    if(!this.checkInputs())
      return;

    //this.loadingService.show();
    //LoadingOrchestrator.signaller.next(true);
    this.isLoading = true;

    this.userService.loginUser(this.userLogin).subscribe({
      next: response => {
        this.isLoading = false;
      
        console.log("Logged successful: ", response);
        this.toastr.success("Successfully loged in");
        
        AuthenticationOrchestrator.signaller.next(true);
      
        if (response && response.accessToken) {
          localStorage.setItem('CURRENT_TOKEN', response.accessToken);
        }
        
        this.router.navigate(['/item-list']);
       
      },
      error: err => {
        this.isLoading = false;
       
        this.toastr.error("Error occured while loging in");
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }


  checkInputs():boolean
  {
    let counter  = 0;
    if(!this.userLogin.userName.endsWith("@gmail.com"))
    {
      ++counter;
      this.isValidEmail = true;
    }
 
    if(counter == 0)
      return true;

      return false;
  }

}


