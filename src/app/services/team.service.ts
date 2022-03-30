import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  _teams: string[] = [];
  teamChange: Subject<string[]> = new Subject<string[]>();


  constructor(private http: HttpClient) {
    this.teamChange.subscribe((value) => {
      this._teams = value
    });

    this.http.get('assets/csv/teams.csv', { responseType: 'text' })
      .subscribe(
        data => {
          var result = data.split(',');

          result.forEach((val, index) => result[index] = val.replace(/\"/g, ''));

          this._setTeams(result)
        }
      );
  }

  _setTeams(title: string[]) {
    this.teamChange.next(title);
  }

  getTeams() {
    return this._teams;
  }
}
