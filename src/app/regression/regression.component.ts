import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { Info } from '../info';
import { InteractivePlotsService } from '../interactive-plots.service';
import { TitleService } from '../title.service';

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
  teamOptions: string[] = ['Loading...'];
  filteredOptionsTeam1?: Observable<string[]>;
  filteredOptionsTeam2?: Observable<string[]>;
  isTeam1Host: boolean = true;
  isHTTPRequesting: boolean = false;
  responseBody: Map<string, string> = new Map<string, string>();
  regressionPlot: any = '';

  classification: Info = new Info(
    'Goals Regression',
    'Predicts the a player\'s goals on their historical data',
    [
      'Only the player\'s shots and shots on target are required.',
      'The R2 is approximately %91.7.',
      'The resulting equation is y = -0.68 + 0.64x1 + 0.32x2, having {x1∈R | x1>=0} and {x2∈R | x2>=0}, where x1 is \"shots\" and x2 is \"shots on goal\".'
    ],
    '',
    ''
  );
  plotSubscription: Subscription | undefined;
  isPanelOpen = false;
  dynamicPlot: string = '';

  constructor(private http: HttpClient, private _titleService: TitleService, private _apiEndpointService: ApiEndpointService , private _interactivePlotsService: InteractivePlotsService) { 
    this.regressionPlot = this._interactivePlotsService.graph;
  }

  ngOnInit(): void {
    this._titleService.setTitle(this.classification.title);
    this.isPanelOpen = false;
  }

  ngOnDestroy() {
    this._titleService.setTitle('');
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

    this.http.get<any>(url).subscribe(data => {
      this.winner = data['Estimated Goals'];
      this.responseBody.clear();
      for (var key in data) {
        this.responseBody.set(key, data[key]);
      }

      this.isHTTPRequesting = false;
    })
  }

  returnZeroPipe() {
    return 0
  }
}
