import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.less'
})
export class LogoutComponent {

  constructor(private toastr: ToastrService, private router: Router) { };

  public removeToken() {

    localStorage.removeItem('CURRENT_TOKEN');
    this.toastr.success("You have been log out");
    this.router.navigate(['/login']);
  }

  public goToItemList() {
    this.router.navigate(['/item-list']);
  }
}
