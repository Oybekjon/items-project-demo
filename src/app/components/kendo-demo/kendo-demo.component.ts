import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { DataStateChangeEvent, GridDataResult, GridModule } from '@progress/kendo-angular-grid';
import { GridState } from '../models/grid-state';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { SubFilter } from '../models/sub-filter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kendo-demo',
  standalone: true,
  imports: [GridModule],
  templateUrl: './kendo-demo.component.html',
  styleUrl: './kendo-demo.component.less'
})
export class KendoDemoComponent implements OnInit {
  public get pageSize(): number {
    return 12;
  }

  public itemsView: GridDataResult = {
    data: [],
    total: 0
  };
  public gridState: GridState = this.creteInitialState();
  public loading: boolean = false;

  constructor(private itemService: ItemService, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public itemsDataStateChange(ev: DataStateChangeEvent): void {
    this.gridState.skip = ev.skip;
    this.gridState.take = ev.take;
    if (ev.filter) {
      this.gridState.filter = ev.filter;
    }
    else {
      this.gridState.filter = {
        logic: "and",
        filters: []
      };
    }
    if (ev.sort && ev.sort.length == 1) {
      this.gridState.sort = ev.sort[0];
    } else {
      this.gridState.sort = null;
    }
    this.loadData();
  }

  private creteInitialState(): GridState {
    return {
      skip: 0,
      take: this.pageSize,
      filter: {
        filters: [],
        logic: "and"
      },
      sort: null
    };
  }

  private loadData(): void {
    this.loading = true;
    const filter = {
      "Filter.Logic": "and",
      "Filter.Filters": this.convertFilters(this.gridState.filter)
    };
    this.itemService.getItemsByPagination(this.gridState.skip, this.gridState.take, filter, this.gridState.sort || undefined).subscribe({
      next: res => {
        this.loading = false;
        this.itemsView = {
          data: res.itemsPagination,
          total: res.totalCount
        };
      },
      error: err => {
        this.loading = false;
        this.toastr.error(err);
      }
    });
  }

  private convertFilters(filter: CompositeFilterDescriptor): SubFilter[] {
    const result: SubFilter[] = [];
    for (let i = filter.filters.length - 1; i >= 0; i--) {
      const currentFilter: CompositeFilterDescriptor = <any>filter.filters[i];
      if (!currentFilter || !currentFilter.logic) {
        filter.filters.splice(i, 1);
      }
    }
    for (let i = 0; i < filter.filters.length; i++) {
      const currentFilter: CompositeFilterDescriptor = <any>filter.filters[i];
      if (currentFilter)

        result.push({
          logic: currentFilter.logic,
          filters: currentFilter.filters?.map((x) => {
            const descriptor: FilterDescriptor = <any>x;
            let strVal;
            if (typeof descriptor.value == "object" && descriptor.value.constructor == Date) {
              if (descriptor.operator === "lte" || descriptor.operator === "gt") {
                const oneDayInMs = 24 * 60 * 60 * 1000;
                strVal = new Date(descriptor.value.getTime() + oneDayInMs).toISOString();
              } else {
                strVal = descriptor.value.toISOString();
              }
            } else {
              strVal = descriptor.value;
            }
            return {
              field: <string><any>descriptor.field,
              operator: <string><any>descriptor.operator,
              value: strVal
            }
          }) || []
        })
    }
    return result;
  }
}
