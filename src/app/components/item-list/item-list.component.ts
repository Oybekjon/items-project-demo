import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item } from '../../services/models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'] // Corrected to styleUrls
})
export class ItemListComponent implements OnInit {

  public items: Item[] = [];

  constructor(private itemService: ItemService) {} // Injecting service through constructor

  public ngOnInit(): void {
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
}
