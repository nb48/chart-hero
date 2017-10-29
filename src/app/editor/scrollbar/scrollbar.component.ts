import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material';
import { Observable } from 'rxjs';

import { AudioPlayerService } from '../../audio-player/audio-player.service';
import { ChartView } from '../../chart-view/chart-view';

const scrollingConstant = 0.018867924528301886;
const lineHeightPx = 17.666;

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar.component.html',
    styleUrls: ['./scrollbar.component.css'],
})
export class ScrollbarComponent implements AfterViewInit {
    @Input() view: ChartView;
    @ViewChild(MatTooltip) currentTimeTooltip: MatTooltip;

    private moving: boolean;
    private playing: boolean;
    private svg: any;

    constructor(public audioPlayer: AudioPlayerService, private scrollbar: ElementRef) {
    }

    ngAfterViewInit() {
        this.moving = false;
        this.playing = false;
        this.svg = this.scrollbar.nativeElement.querySelector('svg');
    }

    get height(): number {
        return 10;
    }

    get handlePosition(): number {
        return 97 - this.height -
            ((94 - this.height) * (this.view.currentTime / this.view.duration));
    }

    scroll(e: any): void {
        if (this.audioPlayer.playing) {
            return;
        }
        const delta = e.deltaMode === 1 ? e.deltaY * lineHeightPx : e.deltaY;
        const targetTime = this.view.currentTime +
            (-scrollingConstant * this.view.currentIncrement * delta);
        const newTime = Math.min(this.view.duration, Math.max(0, targetTime));
        this.audioPlayer.setTime(newTime);
    }

    clickScrollbar(e: any): void {
        if (this.audioPlayer.playing) {
            this.audioPlayer.pause();
            this.playing = true;
        }
        this.propagateTimeChange(e);
        if (this.playing) {
            this.audioPlayer.play();
            this.playing = false;
        }
    }

    clickHandle(e: any): void {
        if (this.audioPlayer.playing) {
            this.audioPlayer.pause();
            this.playing = true;
        }
        this.moving = true;
        this.currentTimeTooltip.show();
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
            if (this.playing) {
                this.audioPlayer.play();
                this.playing = false;
            }
        }
    }

    moveForwards(e: any): void {
        if (this.audioPlayer.playing) {
            return;
        }
        const newTime = Math.min
            (this.view.duration, this.view.currentTime + this.view.currentIncrement);        
        this.audioPlayer.setTime(newTime);
        e.stopPropagation();
    }

    moveBackwards(e: any): void {
        if (this.audioPlayer.playing) {
            return;
        }
        const newTime = Math.max
            (0, this.view.currentTime - this.view.currentIncrement);
        this.audioPlayer.setTime(newTime);
        e.stopPropagation();
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
