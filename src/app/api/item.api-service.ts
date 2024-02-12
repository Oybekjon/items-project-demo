import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ItemModel } from "./models/item.model";
import { ItemPaginationModel } from "./models/itemPagination.model";
import { SubFilter } from "../components/models/sub-filter";

@Injectable({ providedIn: "root" })
export class ItemApiService {
    private client: HttpClient = inject(HttpClient);

    private apiUrl = 'https://localhost:7274/api/Item';
    private api = 'https://localhost:7274/api/Item/DeleteById?id=9';

    public getItems(): Observable<ItemModel[]> {
        return this.client.get<ItemModel[]>("https://localhost:7274/api/Item/GetAll");
    }

    public getItemsByPagination(
        offset: number,
        limit: number,
        filters?: {
            'Filter.Logic': string;
            'Filter.Filters': Array<SubFilter>;
        },
        sort?: {
            dir?: string,
            field: string
        }
    ): Observable<ItemPaginationModel> {
        let url = `https://localhost:7274/api/Item/GetItems?Offset=${offset}&Limit=${limit}`;
        if (filters) {
            url = this.addFiltersToQuery(url, filters);
        }
        if (sort) {
            url = this.addSort(url, sort);
        }
        let result = this.client.get<ItemPaginationModel>(url);
        return result;
    }


    public deleteItem(itemId: number): Observable<any> {
        return this.client.delete(`https://localhost:7274/api/Item/DeleteById?id=${itemId}`);
    }

    public addItem(addItem: ItemModel): Observable<any> {
        return this.client.post("https://localhost:7274/api/Item/CreateNew", addItem, { headers: { 'Content-Type': 'application/json' } })
    }

    public updateItem(updateItem: ItemModel): Observable<any> {
        return this.client.put("https://localhost:7274/api/Item/Update", updateItem, { headers: { 'Content-Type': 'application/json' } })
    }

    private addFiltersToQuery(url: string, params: {
        'Filter.Logic': string;
        'Filter.Filters': Array<SubFilter>;
    }): string {
        let result = url;
        if (params['Filter.Filters'].length > 0) {
            result += `&Filter.Logic=${params['Filter.Logic']}`;
            for (let i = 0; i < params['Filter.Filters'].length; i++) {
                const subFilter = params['Filter.Filters'][i];

                if (subFilter.filters && subFilter.filters.length > 0)
                    for (let j = 0; j < subFilter.filters.length; j++) {
                        const filterDefinition = subFilter.filters[j];
                        result += `&Filter.Filters[${i}].Filters[${j}].Field=${filterDefinition.field}`;
                        result += `&Filter.Filters[${i}].Filters[${j}].Operator=${filterDefinition.operator}`;
                        result += `&Filter.Filters[${i}].Filters[${j}].Value=${filterDefinition.value}`;
                    }
                result += `&Filter.Filters[${i}].Logic=${subFilter.logic}`;
            }
        }
        return result;
    }

    private addSort(url: string, sort: { dir?: string, field: string }): string {
        const dir = typeof sort.dir === "string" ? sort.dir : "asc";
        const result = url + `&SortDir=${dir}&SortField=${sort.field}`;
        return result;
    }
}