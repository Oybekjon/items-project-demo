import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
export interface GridState {
    skip: number,
    take: number,
    filter: CompositeFilterDescriptor,
    sort: { dir?: string, field: string } | null;
}