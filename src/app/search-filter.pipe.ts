import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
      if(!value)return null;
      if(!args)return value;

      args = args.toLowerCase();

      return value.filter(function(item){
          return JSON.stringify(item).toLowerCase().includes(args);
      });
  }
}
