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

  public userRegister : UserLogin = new UserLogin();
  public isLoading : boolean = false;
 

  constructor( private toastr: ToastrService,private userService : UserService, private router: Router, private loadingService: LoadingService ) {}

  public LoginUser(){

    //this.loadingService.show();
    //LoadingOrchestrator.signaller.next(true);
    this.isLoading = true;

    this.userService.loginUser(this.userRegister).subscribe({
      next: response => {
        this.isLoading = false;
        //this.loadingService.hide();
        console.log("Logged successful: ", response);
        this.toastr.success('Hello world!', 'Toastr fun!');
        //LoadingOrchestrator.signaller.next(false);
        AuthenticationOrchestrator.signaller.next(true);
        
      
        if (response && response.accessToken) {
          localStorage.setItem('CURRENT_TOKEN', response.accessToken);
        }
        
        this.router.navigate(['/item-list']);
        

       
      },
      error: err => {
        this.loadingService.hide();
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }

}


