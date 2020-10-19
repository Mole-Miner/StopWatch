import { interval, Observable, timer } from 'rxjs';
import { map, repeat, scan, startWith, take } from 'rxjs/operators';
import { NumberSpeed } from './stopwatch-config';

export class DisplayedNumber {

    private readonly _milliseconds: number = NumberSpeed.MILLISECONDS;
    private readonly _tick$: Observable<number>;

    constructor(due: number, schedule: number, edge: number) {
        this._tick$ = new Observable(observer => {
            timer(due, schedule * this._milliseconds)
                .pipe(
                    take(edge),
                    repeat()    
                )
                .subscribe(vl => observer.next(vl));
            });
    }
 
    public get tick$(): Observable<number> {
        return this._tick$;
    }
}