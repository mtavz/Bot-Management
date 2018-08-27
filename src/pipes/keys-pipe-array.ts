import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'keys_ar'
})
export class KeysArPipe implements PipeTransform {
//    transform(value, args: string[]): any {
    transform(value): any {
        let keys = [];
        for (let key in value) {
            keys.push({ key: parseInt(key), value: value[key] });
        }
        return keys;
    }
}
