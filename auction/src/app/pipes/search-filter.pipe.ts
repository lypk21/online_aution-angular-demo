import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], fieldName: string, keyword: string): unknown {
    if (!keyword || !fieldName) { return list; }
    return list.filter((item) => {
      const fieldValue  = item[fieldName];
      return fieldValue.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
    });
  }

}
