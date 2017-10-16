import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material';
import { Observable } from 'rxjs';

import { AudioPlayerService } from '../../audio-player/audio-player.service';
import { ChartView } from '../../chart-view/chart-view';

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar.component.html',
    styleUrls: ['./scrollbar.component.css'],
})
export class ScrollbarComponent implements AfterViewInit {
    @Input() view: ChartView;
    @ViewChild(MatTooltip) currentTimeTooltip: MatTooltip;

    private moving: boolean;
    private svg: any;

    constructor(public audioPlayer: AudioPlayerService, private scrollbar: ElementRef) {
    }

    ngAfterViewInit() {
        this.moving = false;
        this.svg = this.scrollbar.nativeElement.querySelector('svg');
    }

    get height(): number {
        return 10;
    }

    get y(): number {
        return (100 - this.height) -
            ((100 - this.height) * (this.view.currentTime / this.view.duration));
    }

    clickScrollbar(e: any): void {
        this.propagateTimeChange(e);
    }

    clickHandle(e: any): void {
        if (!this.audioPlayer.playing) {
            this.moving = true;
            this.currentTimeTooltip.show();            
        }
    }

    moveHandle(e: any): void {
        if (this.moving) {
            this.currentTimeTooltip.hide();
            this.currentTimeTooltip.show();
            this.propagateTimeChange(e);
        }
    }

    releaseHandle(e: any): void {
        if (this.moving) {
            this.propagateTimeChange(e);
            this.moving = false;
        }
    }

    private propagateTimeChange(e: any) {
        this.audioPlayer.setTime(this.calculateTime(e));
    }

    private calculateTime(e: any): number {
        const point = this.svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const yPos = point.matrixTransform(this.svg.getScreenCTM().inverse()).y;
        const clampedPos = Math.min(100 - (this.height / 2), Math.max(this.height / 2, yPos));
        const scaledPos = (clampedPos - (this.height / 2)) / (100 - this.height);
        return (1 - scaledPos) * this.view.duration;
    }
}
