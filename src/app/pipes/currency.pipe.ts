import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      console.log(args.currencyFormat);
      const currencyFormat = args.currencyFormat;
      const currencyValue = parseFloat(args.currencyValue);
      if (currencyFormat === 'US') {
        return this.convertToDollar(value);
      } else if (currencyFormat === 'PH') {
        return this.convertToPeso(value * currencyValue);
      }
      return null;
    }
  }

  convertToDollar(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  convertToPeso(number) {
    return number.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
  }

}
