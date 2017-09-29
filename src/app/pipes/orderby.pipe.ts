
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderbyPipe implements PipeTransform {

  transform(records: Array<any>, args?: any): any {

    let property = args.property;
    if (property == 'name') {

      return records.sort(function (a, b) {

        if (a[args.property].toLocaleLowerCase() < b[args.property].toLocaleLowerCase()) {
          return -1 * args.direction;
        }
        else if (a[args.property].toLocaleLowerCase() > b[args.property].toLocaleLowerCase()) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      });

    } else if (property != 'name') {
      let categories = args.categories;

      return records.sort(function (a, b) {

        console.log(a[args.property])

        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        }
        else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      });

    }


  };
}

