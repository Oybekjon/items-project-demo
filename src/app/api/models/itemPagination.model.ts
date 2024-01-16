import { ItemModel } from "./item.model";

export interface ItemPaginationModel {
    totalCount: number;
    itemsPagination : ItemModel[];
}