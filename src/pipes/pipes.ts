import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeysPipe } from './keys-pipe';
import { KeysArPipe } from './keys-pipe-array';

@NgModule({
    imports: [CommonModule],
    declarations: [
        KeysPipe,
        KeysArPipe,
    ],
    exports: [
        KeysPipe,
        KeysArPipe,
    ]
})

export class PipeModule {
    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}