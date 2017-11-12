import { Component } from '@angular/core';

import { GuitarToGHLConverterService } from '../guitar-to-ghl/guitar-to-ghl-converter.service';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {

    shouldConvertExpertGuitarToExpertGHL: boolean;

    constructor(private guitarToGHLConverter: GuitarToGHLConverterService) {
        this.guitarToGHLConverter.shouldConverts.subscribe((shouldConvert) => {
            this.shouldConvertExpertGuitarToExpertGHL = shouldConvert;
        });
    }

    convertExpertGuitarToExpertGHLGuitar() {
        this.guitarToGHLConverter.convertExpert();
    }
}
