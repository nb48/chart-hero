import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material';
import { Observable } from 'rxjs';

import { TimeService } from '../../time/time.service';
import { showTime } from '../audio-player-controls/audio-player-controls.component';
import { DurationService } from '../duration/duration.service';
import { IncrementService } from '../increment/increment.service';

const scrollingConstant = 0.018867924528301886;
const lineHeightPx = 17.666;
const scrollSpeed = 0.1;

const formattedZero = showTime(0);

@Component({
    selector: 'app-scrollbar',
    templateUrl: './scrollbar.component.html',
    styleUrls: ['./scrollbar.component.css'],
})
export class ScrollbarComponent implements AfterViewInit {
    @ViewChild(MatTooltip) currentTimeTooltip: MatTooltip;

    private duration: number;
    private increment: number;
    private currentTime: number;
    private formattedDuration: string;
    private formattedTime: string;
    private moving: boolean;
    private playing: boolean;
    private svg: any;
    private recentlyReleasedHandle: boolean;

    constructor(
        private durationService: DurationService,
        private incrementService: IncrementService,
        private scrollbarElement: ElementRef,
        private timeService: TimeService,
    ) {
        this.durationService.durations.subscribe((duration) => {
            this.duration = duration;
            this.formattedDuration = showTime(duration);
        });
        this.incrementService.increments.subscribe((increment) => {
            this.increment = increment;
        });
        this.timeService.times.subscribe((time) => {
            this.currentTime = time;
            this.formattedTime = showTime(time);
        });
    }

    ngAfterViewInit() {
        this.moving = false;
        this.playing = false;
        this.svg = this.scrollbarElement.nativeElement.querySelector('svg');
    }

    get height(): number {
        return 10;
    }

    get handlePosition(): number {
        return 97 - this.height -
            ((94 - this.height) * (this.currentTime / this.duration));
    }

    get topAnchorTooltip(): string {
        return this.formattedDuration;
    }

    get handleTooltip(): string {
        return this.formattedTime;
    }

    get bottomAnchorTooltip(): string {
        return formattedZero;
    }

    scroll(e: any): void {
        if (this.timeService.playing) {
            return;
        }
        const delta = e.deltaMode === 1 ? e.deltaY * lineHeightPx : e.deltaY;
        const targetTime = this.currentTime +
            (-scrollingConstant * delta * scrollSpeed);
        const newTime = Math.min(this.duration, Math.max(0, targetTime));
        this.timeService.time = newTime;
    }

    clickScrollbar(e: any): void {
        if (this.recentlyReleasedHandle) {
            return;
        }
        if (this.timeService.playing) {
            this.timeService.pause();
            this.playing = true;
        }
        this.propagateTimeChange(e);
        if (this.playing) {
            this.timeService.play();
            this.playing = false;
        }
    }

    clickHandle(e: any): void {       
        if (this.timeService.playing) {
            this.timeService.pause();
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
                this.timeService.play();
                this.playing = false;
            }
            this.recentlyReleasedHandle = true;
            setTimeout(() => this.recentlyReleasedHandle = false, 100);
        }
    }

    moveForwards(e: any): void {
        if (this.timeService.playing) {
            return;
        }
        const newTime = Math.min(
            this.duration,
            this.currentTime + this.increment,
        );
        this.timeService.time = newTime;
        e.stopPropagation();
    }

    moveBackwards(e: any): void {
        if (this.timeService.playing) {
            return;
        }
        const newTime = Math.max
            (0, this.currentTime - this.increment);
        this.timeService.time = newTime;
        e.stopPropagation();
    }

    private propagateTimeChange(e: any) {
        const newTime = this.calculateTime(e);
        this.timeService.time = newTime;
    }

    private calculateTime(e: any): number {
        const point = this.svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const yPos = point.matrixTransform(this.svg.getScreenCTM().inverse()).y;
        const clampedPos = Math.min(100 - (this.height / 2), Math.max(this.height / 2, yPos));
        const scaledPos = (clampedPos - (this.height / 2)) / (100 - this.height);
        return (1 - scaledPos) * this.duration;
    }
}
