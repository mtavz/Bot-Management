import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { KeysPipe } from "./keys-pipe";
import { KeysArPipe } from './keys-pipe-array';
//import { RelativeTime } from "./relative-time";

@NgModule({
    imports: [CommonModule],
    declarations: [
        KeysPipe,
        KeysArPipe,
        //RelativeTime
    ],
    exports: [
        KeysPipe,
        KeysArPipe,
        //RelativeTime
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