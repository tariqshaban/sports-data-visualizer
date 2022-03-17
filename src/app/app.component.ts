import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dashboard: string = '';
  url_value: string = '';

  url = new Map<string, string>();

  ngOnInit(): void {
    this.url.set('Player Age', 'https://public.tableau.com/views/Soccer_16469397037610/PlayerAge');
    this.url.set('League Cards', 'https://public.tableau.com/views/Soccer_16469397037610/LeaguesCards');
    this.url.set('Player Nationality', 'https://public.tableau.com/views/Soccer_16469397037610/PlayersNationalities_1');
    this.url.set('Countries Attendance', 'https://public.tableau.com/views/Soccer_16469397037610/CountryAttendance');
    this.url.set('Teams Attendance', 'https://public.tableau.com/views/Soccer_16469397037610/TeamAttendance');
    this.url.set('Stadium Attendance', 'https://public.tableau.com/views/Soccer_16469397037610/StadiumAttendance');
    this.url.set('Worldwide Attendance', 'https://public.tableau.com/views/Soccer_16469397037610/WorldwideAttendance');
    this.url.set('Teams Performance', 'https://public.tableau.com/views/Soccer_16469397037610/TeamPerformance');
    this.url.set('Player Performance', 'https://public.tableau.com/views/Soccer_16469397037610/PlayerPerformance');
    this.url.set('League Performance', 'https://public.tableau.com/views/Soccer_16469397037610/LeaguePerformance');
    this.url.set('Yearly Attendance Hypothesis Testing', 'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceAttendance');
    this.url.set('Club Attendance Hypothesis Testing', 'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceAttendanceClub');
    this.url.set('Player Position Height Hypothesis Testing', 'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceGoalkeeperNon-GoalkeeperHeight');
    this.url.set('Club Position Goals Hypothesis Testing', 'https://public.tableau.com/views/Soccer_16469397037610/SignificantDifferenceForwardMiddle-FielderGoals');
  }


  setDashboard(target_object: any) {
    if (target_object.currentTarget.children.length > 1) {
      this.dashboard = target_object.currentTarget.children[1].innerText;
    } else {
      this.dashboard = target_object.currentTarget.innerText;
    }
    this.url_value = this.url.get(this.dashboard) as string;
  }

  clearDashboard() {
    this.dashboard = '';
    this.url_value = '';
  }
}
