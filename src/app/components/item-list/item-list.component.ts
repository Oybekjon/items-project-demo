import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item } from '../../services/models/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'] // Corrected to styleUrls
})
export class ItemListComponent implements OnInit {

  public items: Item[] = [];
  public idToDelete: number | null = null;

  constructor(private itemService: ItemService) { } // Injecting service through constructor

  public ngOnInit(): void {
    this.getItems();
  }

  getItems()
  {
    this.itemService.getItems().subscribe(
      (data) => {
        this.items = data;
        console.log(this.items); // Logging the items array
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }


 

  public deleteItem(): void {
    if (typeof this.idToDelete === "number" && this.idToDelete > 0) {
      this.itemService.deleteItem(this.idToDelete).subscribe({
        next: response => {
          console.log("Delete successful:", response);
          // You can handle the response here, e.g., update the UI or a list
        },
        error: err => {
          console.error("Error during delete:", err);
          // Handle the error here
        }
      });
    } else {
      console.log("Invalid idToDelete value");
    }
  }
  



}
