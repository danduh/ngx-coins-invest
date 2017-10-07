import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        try {
            if (!!value && !isNaN(value)) {
                return Number(Number(value).toFixed(2)).toLocaleString();
            } else {
                return null;
            }
        } catch (err) {
            console.error(value);
            console.error(err);
        }
    }
}
