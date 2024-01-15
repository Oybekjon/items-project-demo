import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../services/models/item';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.less'
})
export class AddItemComponent {

  public item : Item = new Item();

  constructor(private itemService: ItemService) { } 

  public addItem() : void{
    
    this.itemService.addItem(this.item).subscribe({
      next: response => {
        console.log("Added successful: ", response);
        alert("Successfuly added");
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }
}
