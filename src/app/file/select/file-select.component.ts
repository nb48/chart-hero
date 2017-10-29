import { Component } from '@angular/core';

import { FileStoreService } from '../store/file-store.service';

@Component({
    selector: 'app-file-select',
    templateUrl: './file-select.component.html',
    styleUrls: ['./file-select.component.css'],
})
export class FileSelectComponent {

    constructor(public store: FileStoreService) {
    }
}
