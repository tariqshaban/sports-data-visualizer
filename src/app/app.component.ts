import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from './title.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTitle: string = '';

  constructor(private _router: Router, private _titleService: TitleService) { }

  ngOnInit(): void {
    this._titleService.titleChange.subscribe((value) => {
      setTimeout(() => {
        this.currentTitle = value;
      });
    });
  }

  setPlot(target_object: any) {
    var selected_plot_name = ''

    if (target_object.currentTarget.children.length > 1) {
      selected_plot_name = target_object.currentTarget.children[1].innerText;
    } else {
      selected_plot_name = target_object.currentTarget.innerText;
    }

    this._router.navigate(['/plots', selected_plot_name])
  }

  openClassification() {
    this._router.navigate(['/classification'])
  }

  openRegression() {
    this._router.navigate(['/regression'])
  }

  goToHome() {
    this._router.navigate(['/'])
  }
}
