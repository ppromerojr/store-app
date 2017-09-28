import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(args.currencyFormat)
    let currencyFormat = args.currencyFormat;
    let currencyValue = parseFloat(args.currencyValue);
    if (currencyFormat == 'PH') {
      return this.ppCurrency(value * currencyValue);
    } else if (currencyFormat == 'US') {

    }


    return null;
  }

  ppCurrency(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

}
