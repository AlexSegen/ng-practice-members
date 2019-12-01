import {Pipe, PipeTransform} from '@angular/core';
import numeral from 'numeral';

@Pipe({
    name: "formatCurrency"
})

export class CurrencyPipe implements PipeTransform {
    transform(value:String) {
        return numeral(value).format('0,0');
    }
}