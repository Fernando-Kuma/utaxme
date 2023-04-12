import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'thousandsPipe'
    })

export class ThousandsPipe implements PipeTransform {

    public transform(value: any) {
        //return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = value.toString().split(',');
        arr[0] = arr[0].replace(exp,rep);
        return arr[1] ? arr.join(','): arr[0];
    }
}