import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { zip, fromEvent,interval, Observable, range, Subscription, merge, NEVER, of, timer} from 'rxjs';
import { buffer, debounceTime, map, repeat, filter, debounce, mapTo, scan, startWith, switchMap, takeWhile, take, mergeMap, delay, mergeAll, tap, combineAll } from 'rxjs/operators';
import { DisplayedNumberService } from './stopwatch/displayed-number.service';
import { NumberKey } from './stopwatch/stopwatch-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'stopwatch';

  @ViewChild('start') startBtn: ElementRef;
  @ViewChild('stop') stopBtn: ElementRef;
  @ViewChild('wait') waitBtn: ElementRef;
  @ViewChild('reset') resetBtn: ElementRef;

  seconds = 0;
  minutes = 0;
  hours = 0;

  counter$: Observable<number>;

  constructor(private numberService: DisplayedNumberService) {}

  ngOnInit() {
    this.counter$ = merge(
      this.numberService.getDisplayedNumber(NumberKey.SECONDS).tick$
        .pipe(
          tap(num => this.seconds = num)
        ),
      this.numberService.getDisplayedNumber(NumberKey.MINUTES).tick$
        .pipe(
          tap(num => this.minutes = num)
        ),
      this.numberService.getDisplayedNumber(NumberKey.HOURS).tick$
        .pipe(
          tap(num => this.hours = num) 
        )
    )
  }

  ngAfterViewInit() {
    const start$: Observable<boolean> = fromEvent(this.startBtn.nativeElement, 'click')
      .pipe(
        mapTo(true)
      );

    const stop$: Observable<boolean> = fromEvent(this.stopBtn.nativeElement, 'click')
      .pipe(
        map(() => {
          this.seconds = 0;
          this.minutes = 0;
          this.hours = 0;
        }),
        mapTo(false)
      );

    const wait$: Observable<boolean> = fromEvent(this.waitBtn.nativeElement, 'click');

    const doubleClick$: Observable<boolean> = wait$
      .pipe(
        buffer(wait$.pipe(debounceTime(300))),
        map(clicks => clicks.length),
        filter(length => length === 2),
        mapTo(false)
      );

    const reset$: Observable<boolean> = fromEvent(this.resetBtn.nativeElement, 'click')
      .pipe(
        mapTo(true)
      );      

    merge(
      start$, 
      stop$, 
      doubleClick$, 
      reset$
      )
      .pipe(
        switchMap(val => (val ? this.counter$ : NEVER)),
      )
      .subscribe();
  }
}
