import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value, term, nonFilterFields = [], filterInFields = []) {
        if (!Array.isArray(nonFilterFields)) {
            nonFilterFields = [nonFilterFields];
        }
        if (!term)
            return value;

        let result = null,
            _term = term.toString();

        if (term === undefined)
            return value;

        if (!!value) {
            if (filterInFields.length === 0) {
                result = value.filter((item) => {
                    let found = false;
                    try {
                        for (let key in item) {
                            if (item.hasOwnProperty(key) && !found && item[key] && nonFilterFields.indexOf(key) === -1) {
                                found = item[key].toString().toLowerCase().includes(_term.toLowerCase());
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    if (found)
                        return item;

                });
            } else {
                result = value.filter((item) => {
                    let found = false;
                    try {
                        filterInFields.some((field) => {
                            let value = field.split('.').reduce((o, i) => o[i], item);
                            found = !!value && value.toString().toLowerCase().includes(_term.toLowerCase());
                            return found;
                        });
                    } catch (err) {
                        console.log(err);
                    }
                    if (found)
                        return item;

                });
            }
        }
        return result;
    }


}


