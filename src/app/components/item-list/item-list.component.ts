import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AddItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.less'
})
export class ItemListComponent {
  public modalVisible: boolean = false;
  public componentModalVisible: boolean = false;

  public showModal(): void {
    this.modalVisible = true;
  }

  public hideModal(): void {
    this.modalVisible = false;
  }

  public saveChanges(): void {
    // do something
    this.modalVisible = false;
  }

  public showComponentModal(): void {
    this.componentModalVisible = true;
  }

  public hideComponentModal(): void {
    this.componentModalVisible = false;
  }

  public saveComponentChanges(): void {
    // do something
    this.componentModalVisible = false;
  }
}
