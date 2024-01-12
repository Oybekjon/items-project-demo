import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ItemModel } from "./models/item.model";

@Injectable({providedIn: "root"})
export class ItemApiService{
    private client:HttpClient = inject(HttpClient);

    private apiUrl = 'https://localhost:7274/api/Item';
    private api = 'https://localhost:7274/api/Item/DeleteById?id=9';

    public getItems(): Observable<ItemModel[]>{
        return this.client.get<ItemModel[]>("https://localhost:7274/api/Item/GetAll");
    }

    public deleteItem(itemId: number): Observable<any> {
        return this.client.delete(`https://localhost:7274/api/Item/DeleteById?id=${itemId}`);
    }
    
    public addItem(addItem : ItemModel ): Observable<any> {
        return this.client.post("https://localhost:7274/api/Item/CreateNew" ,addItem );
    }

}