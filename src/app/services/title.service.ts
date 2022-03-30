import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  _title: string = '';
  titleChange: Subject<string> = new Subject<string>();


  constructor() {
    this.titleChange.subscribe((value) => {
      this._title = value
    });
  }

  getTitle() {
    return this._title;
  }

  setTitle(title: string) {
    this.titleChange.next(title);
  }
}
