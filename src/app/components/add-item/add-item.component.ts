import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../services/models/item';
import { Router } from '@angular/router';
import { LoadingService } from '../models/loadingService';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.less'
})
export class AddItemComponent {

  public item : Item = new Item();

  constructor(private itemService: ItemService, private router: Router, private loadingService: LoadingService) { } 

  public addItem() : void{
    this.loadingService.show();
    this.itemService.addItem(this.item).subscribe({
      next: response => {
        this.loadingService.hide();
        console.log("Added successful: ", response);
        this.router.navigate(['/item-list']);
        
        
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.error("Error during delete:", err);
        alert("error accured while adding");
        // Handle the error here
      }
    });;
  }
}
