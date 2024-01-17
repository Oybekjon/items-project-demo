import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.less'
})
export class LogoutComponent {

  constructor( private router: Router){};

  public removeToken() {
    
    localStorage.removeItem('CURRENT_TOKEN');
    this.router.navigate(['/login']);
  }

  public goToItemList()
  {
    this.router.navigate(['/item-list']);
  }


}
