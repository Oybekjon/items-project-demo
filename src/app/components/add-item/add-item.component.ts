import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.less'
})
export class AddItemComponent {


  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: Date | null = null;


  constructor(private itemService: ItemService) { } 

  public addItem() : void{
    this.itemService.addItem(this.itemName, this.itemType, this.itemDate);
  }


}
