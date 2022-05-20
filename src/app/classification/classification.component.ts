import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable, of, startWith, Subscription, timeout } from 'rxjs';
import { ApiEndpointService } from '../services/api-endpoint.service';
import { TeamService } from '../services/team.service';
import { TitleService } from '../services/title.service';
import { Info, QA } from '.././models/info';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css', '../app.component.css']
})
export class ClassificationComponent implements OnInit {
  winnerForm = new FormGroup({
    'team1Control': new FormControl('', Validators.required),
    'team2Control': new FormControl('', Validators.required),
  }, {
    validators: this.uniqueValidator('team1Control', 'team2Control')
  });
  winner = '';
  timeout = false;
  teamOptions: string[] = ['Loading...'];
  filteredOptionsTeam1?: Observable<string[]>;
  filteredOptionsTeam2?: Observable<string[]>;
  isTeam1Host: boolean = true;
  isHTTPRequesting: boolean = false;
  responseBody: Map<string, string> = new Map<string, string>();

  classification: Info = new Info(
    'Winning Classification',
    'Predicts the winning team based on their historical data',
    [
      'Only the team names are required, since the endpoint have an abstraction layer in which it checks their historical data without the need to specify it manually.',
      'The most variables which contribute to the decision are the historical goals and which team is the host.',
      'The resulting accuracy is approximately %64.8.'
    ],
    [
      new QA('Which team is most likely to win? Bayern Munich or Barcelona?', 'Bayern Munich.'),
      new QA('Which team is most likely to win? Barcelona or Liverpool?', 'Barcelona, but only when they are home.')
    ],
    '',
    './assets/image/roc.png'
  );
  plotSubscription: Subscription | undefined;
  isPanelOpen = false;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private _titleService: TitleService, private _teamService: TeamService, private _apiEndpointService: ApiEndpointService) { }

  ngOnInit(): void {
    this._titleService.setTitle(this.classification.title);
    this.isPanelOpen = false;

    if (this._teamService.getTeams().length !== 0) {
      this.populateTeams(this._teamService.getTeams());
    }

    this._teamService.teamChange.subscribe((value) => {
      this.populateTeams(value);
    });
  }

  ngOnDestroy() {
    this._titleService.setTitle('');
  }

  populateTeams(teams: string[]) {
    this.teamOptions = teams

    this.filteredOptionsTeam1 = this.winnerForm.get('team1Control')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTeam1(value)),
    );

    this.filteredOptionsTeam2 = this.winnerForm.get('team2Control')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTeam2(value)),
    );
  }

  getAnswer(value: string) {
    this._snackBar.open(
      value,
      '',
      { duration: 4000 }
    );
  }

  private _filterTeam1(value: string): string[] {
    const filterValue = value.toLowerCase();
    var team2Val = this.winnerForm.get('team2Control')?.value;
    if (team2Val == null)
      return this.teamOptions.filter(option => option.toLowerCase().includes(filterValue));
    return this.teamOptions.filter(option => option.toLowerCase().includes(filterValue) && option != team2Val);

  }

  private _filterTeam2(value: string): string[] {
    const filterValue = value.toLowerCase();
    var team1Val = this.winnerForm.get('team1Control')?.value;
    if (team1Val == null)
      return this.teamOptions.filter(option => option.toLowerCase().includes(filterValue));
    return this.teamOptions.filter(option => option.toLowerCase().includes(filterValue) && option != team1Val);
  }

  private uniqueValidator(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfControlA = formGroup.get(controlNameA)?.value;
      const valueOfControlB = formGroup.get(controlNameB)?.value;

      if (valueOfControlA && valueOfControlB && valueOfControlA.toLowerCase() === valueOfControlB.toLowerCase()) {
        return { valuesMatch: true }
      } else {
        return null
      }
    }
  }


  submit() {
    if (this.winnerForm.get('team1Control')?.value && this.winnerForm.get('team2Control')?.value) {
      var team1 = this.winnerForm.get('team1Control')?.value
      var team2 = this.winnerForm.get('team2Control')?.value

      if (team1 != team2) {
        if (!this.isTeam1Host) {
          [team1, team2] = [team2, team1];
        }

        this.issueRequest(team1, team2);
      }
    }
  }

  issueRequest(team1: string, team2: string) {
    this.isHTTPRequesting = true;

    var url = this._apiEndpointService.winnerEndpoint;
    url += '?club1=' + team1;
    url += '&club2=' + team2;

    this.http.get<any>(url)
      .pipe(timeout(3000))
      .subscribe({
        next: (data) => {
          this.timeout = false;
          this.winner = data.winner;
          this.responseBody.clear();
          for (var key in data['details']) {
            this.responseBody.set(key, data['details'][key].toPrecision(2));
          }

          this.responseBody = this.beautifyResponse(
            this.responseBody,
            this.winnerForm.get('team1Control')?.value,
            this.winnerForm.get('team2Control')?.value
          );
          this.responseBody.set('Winner', data.winner);

          this.isHTTPRequesting = false;
        },
        error: () => {
          this.winner = '';
          this.responseBody.clear();
          this.timeout = true;
          this.isHTTPRequesting = false;
          return of(null);
        }
      })
  }

  beautifyResponse(responseBody: Map<string, string>, team1: string, team2: string) {
    var newResponse = new Map<string, string>();

    var ordered_teams = [team1, team2].sort((one, two) => (one.toUpperCase() > two.toUpperCase() ? 1 : -1));

    newResponse.set(ordered_teams[0] + ' Home', responseBody.get('team_1_home')!);
    newResponse.set(ordered_teams[1] + ' Home', responseBody.get('team_2_home')!);

    newResponse.set(ordered_teams[0] + ' Average Goals', responseBody.get('club1_avg_goals')!);
    newResponse.set(ordered_teams[1] + ' Average Goals', responseBody.get('club2_avg_goals')!);

    newResponse.set(ordered_teams[0] + ' Average Assists', responseBody.get('club1_avg_assists')!);
    newResponse.set(ordered_teams[1] + ' Average Assists', responseBody.get('club2_avg_assists')!);

    newResponse.set(ordered_teams[0] + ' Average Shots', responseBody.get('club1_avg_shots')!);
    newResponse.set(ordered_teams[1] + ' Average Shots', responseBody.get('club2_avg_shots')!);

    newResponse.set(ordered_teams[0] + ' Average Shots on Target', responseBody.get('club1_avg_shots_on_target')!);
    newResponse.set(ordered_teams[1] + ' Average Shots on Target', responseBody.get('club2_avg_shots_on_target')!);

    newResponse.set(ordered_teams[0] + ' Average Saves', responseBody.get('club1_avg_saves')!);
    newResponse.set(ordered_teams[1] + ' Average Saves', responseBody.get('club2_avg_saves')!);

    return newResponse;
  }

  returnZeroPipe() {
    return 0
  }
}
