import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription, timeout } from 'rxjs';
import { ApiEndpointService } from '../services/api-endpoint.service';
import { InteractivePlotsService } from '../services/interactive-plots.service';
import { TitleService } from '../services/title.service';
import { Info, QA } from '.././models/info';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.css', '../app.component.css']
})
export class RegressionComponent implements OnInit {
  goalForm = new FormGroup({
    'shotsControl': new FormControl('', Validators.required),
    'shotsOnTargetControl': new FormControl('', Validators.required),
  });
  winner = '';
  timeout = false;
  teamOptions: string[] = ['Loading...'];
  filteredOptionsTeam1?: Observable<string[]>;
  filteredOptionsTeam2?: Observable<string[]>;
  isTeam1Host: boolean = true;
  isHTTPRequesting: boolean = false;
  responseBody: Map<string, string> = new Map<string, string>();
  regressionPlot: any = '';

  regression: Info = new Info(
    'Goals Regression',
    'Predicts the a player\'s goals on their historical data',
    [
      'Only the player\'s shots and shots on target are required.',
      'The R2 (coefficient of determination) is approximately %91.7.',
      'R2 measures how well observed outcomes are replicated by the model (the higher, the better).',
      'Not to be confused with mean squared error (MSE)',
      'The resulting equation is y = -0.68 + 0.64x1 + 0.32x2, having {x1∈R | x1>=0} and {x2∈R | x2>=0}, where x1 is \"shots\" and x2 is \"shots on goal\".'
    ],
    [
      new QA('Given that a player had 10 shots and 5 shots on target. What is the estimated number of goals he acquired?', 'Approx. 7.67.'),
      new QA('Given that a player had 20 shots and 7 shots on target. What is the estimated number of goals he acquired?', 'Approx. 14.53.'),
    ],
    '',
    ''
  );
  plotSubscription: Subscription | undefined;
  isPanelOpen = false;
  dynamicPlot: string = '';

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private _titleService: TitleService, private _apiEndpointService: ApiEndpointService, private _interactivePlotsService: InteractivePlotsService) {
    this.regressionPlot = this._interactivePlotsService.graph;
  }

  ngOnInit(): void {
    this._titleService.setTitle(this.regression.title);
    this.isPanelOpen = false;
  }

  ngOnDestroy() {
    this._titleService.setTitle('');
  }

  getAnswer(value: string) {
    this._snackBar.open(
      value,
      '',
      { duration: 4000 }
    );
  }

  submit() {
    if (this.goalForm.get('shotsControl')?.value && this.goalForm.get('shotsOnTargetControl')?.value) {
      var shots = this.goalForm.get('shotsControl')?.value
      var shotsOnTarget = this.goalForm.get('shotsOnTargetControl')?.value
      this.issueRequest(shots, shotsOnTarget);
    }
  }

  issueRequest(shots: string, shotsOnTarget: string) {
    this.isHTTPRequesting = true;

    var url = this._apiEndpointService.goalEndpoint;
    url += '?shots=' + shots;
    url += '&shots_on_target=' + shotsOnTarget;

    this.http.get<any>(url)
    .pipe(timeout(3000))
    .subscribe({
      next: (data) => {
        this.timeout = false;
        this.winner = data['Estimated Goals'];
        this.responseBody.clear();
        for (var key in data) {
          this.responseBody.set(key, data[key]);
        }

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

  returnZeroPipe() {
    return 0
  }
}
