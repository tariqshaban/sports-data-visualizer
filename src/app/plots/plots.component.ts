import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Info } from '.././models/info';
import { PlotService } from '../services/plot.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css', '../app.component.css']
})
export class PlotsComponent implements OnInit {
  selectedPlot: Info | undefined;
  plotSubscription: Subscription | undefined;
  isPanelOpen = false;

  constructor(private _snackBar: MatSnackBar, private _route: ActivatedRoute, private _plotService: PlotService) { }

  ngOnInit(): void {
    this.plotSubscription = this._route.paramMap.subscribe(paramMap => {
      this.isPanelOpen = false;
      var plot = this._plotService.getPlotByName(paramMap.get('name'));
      this._plotService.setSelectedPlot(plot)
      this.selectedPlot = plot;
    });
  }

  ngOnDestroy() {
    this._plotService.setSelectedPlot(undefined)
    this.plotSubscription?.unsubscribe();
  }

  getAnswer(value: string) {
    this._snackBar.open(
      value,
      '',
      { duration: 4000 }
    );
  }
}
