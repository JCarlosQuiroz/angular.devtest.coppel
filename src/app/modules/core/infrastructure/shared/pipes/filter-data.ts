import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterData',
    pure: false
})
export class FilterData implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            for (const key in filter) {
                if ((filter[key] && item[key] && item[key].toLowerCase().indexOf(filter[key].toLowerCase()) !== -1) || !filter[key]) {
                    return item;
                }
            }
        });
    }
}