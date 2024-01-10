import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  public value:number = 0;

  public increaseValue() : void {
    ++this.value;
    console.log(this.value);
    this.check();
  }

  public decreaseValue() : void {
    --this.value;
    console.log(this.value);
    this.check();
  }

  public check() : void{
    const v = document.getElementById("decreaseNumber");
    if(this.value < 0 )
    {
      
      if(v != null)
      {
        v.innerHTML = "Stop bitch";
      }
    }
    else
    {
      if(v != null)
      {
        v.innerHTML = "Decrease";
      }
    }
  }

}
