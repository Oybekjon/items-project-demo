/*
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
constructor( private router: Router){}

  public loading$ = this.loadingSubject.asObservable();

  public show(): void {
    this.loadingSubject.next(true);
  }

  public hide(): void {
    this.loadingSubject.next(false);
  }
}
*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  //constructor(private router: Router){}

  //res : boolean = false;

  public hide():void {
    this.loadingSubject.next(false);  
  }

  public show():void {
    this.loadingSubject.next(true);
  }
/*
  public async showLoading(delay: number = 0) : Promise<void>
  {
    this.res = true;
    await this.router.navigate(['/item-list']);
    return new Promise((resolve) => {
        setTimeout(() => {
          
          resolve();
        }, delay);
      });
  }
*/

/*
  public getResult() : boolean
  {
    return this.res;
  }
*/

/*
  public async hideLoading(delay: number = 0) : Promise<void>
  {
    this.res = false;
    await this.router.navigate(['/item-list']);
    return new Promise((resolve) => {
        setTimeout(() => {
         
          resolve();
        }, delay);
      });
  }
*/

  

 
}
