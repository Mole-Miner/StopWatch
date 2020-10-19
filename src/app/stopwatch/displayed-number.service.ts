import { Injectable } from '@angular/core';
import { DisplayedNumber } from './displayed-number';
import { NumberKey, NumberSchedule, NumberEdge, NumberDue } from './stopwatch-config';

@Injectable({
  providedIn: 'root'
})
export class DisplayedNumberService {

  private readonly _displayedNumbers: Map<string, DisplayedNumber> = new Map();
  
  constructor() { 
    this._displayedNumbers.set(NumberKey.SECONDS, new DisplayedNumber(NumberDue.DUE, NumberSchedule.SECOND, NumberEdge.SIXTY_ONE));
    this._displayedNumbers.set(NumberKey.MINUTES, new DisplayedNumber(NumberDue.DUE, NumberSchedule.MINUTE, NumberEdge.SIXTY_ONE));
    this._displayedNumbers.set(NumberKey.HOURS, new DisplayedNumber(NumberDue.DUE, NumberSchedule.HOUR, NumberEdge.TWENTY_FIVE));
  }

  public getDisplayedNumber(key: string): DisplayedNumber {
    return this._displayedNumbers.get(key);
  }
}
