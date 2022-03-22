import { Component, OnInit } from '@angular/core';

import { Plot } from './plot';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  current_plot: Plot | undefined;
  is_panel_open = false;

  plots: Plot[] = [];

  ngOnInit(): void {
    this.plots.push(new Plot(
      'Countries Attendance',
      'Visualizes each country\'s share of attendance for a predefined time span',
      [
        'England is the highest hosting county, regardless of the year.',
        'The total recorded attendance is roughly 2.4 billion.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/CountryAttendance'
    ));
    this.plots.push(new Plot(
      'Stadium Attendance',
      'Visualizes each stadium\'s share of attendance for a predefined time span',
      [
        'The highest 15 stadiums in attendance aggregated to 330 million, during the span of 2001 and 2021, this value is small compared to the total amount since there are many null values.',
        'The usage of the symbol plot here is discouraged because the number of stadiums is of monumental proportions.',
        'The total recorded attendance is roughly 2.4 billion.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/StadiumAttendance'
    ));
    this.plots.push(new Plot(
      'Teams Attendance',
      'Visualizes each team\'s share of attendance for a predefined time span',
      [
        'The highest 15 teams in attendance aggregated to 555 million, during the span of 2001 and 2021.',
        'Most of the highest 15 teams represents England, this indicated that there is a relationship between a country and its teams regarding the attendance.',
        'It can be noted that the aggregation of all teams is nearly double the total attendance since two teams participate in a match, which leads to counting the attendance twice.',
        'The total recorded attendance is roughly 2.4 billion.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/TeamAttendance'
    ));
    this.plots.push(new Plot(
      'Worldwide Attendance',
      'Visualizes the overall attendance fluctuation for a predefined time span (Displayed yearly, monthly, and daily)',
      [
        'The highest 15 teams in attendance aggregated to 555 million, during the span of 2001 and 2021.',
        'Plots indicate a severe drop in the attendance between year 2020 and 2021; this is due to the strict precautions enforced in response to the Covid-19 pandemic.',
        'The number of  matches, as well as the attendance, is relatively higher on Saturday and Sunday (during the weekends)',
        'The total recorded attendance is roughly 2.4 billion.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/WorldwideAttendance'
    ));

    this.plots.push(new Plot(
      'Teams Performance',
      'Compares between two teams based on the percentage of wins as a metric for a predefined time span',
      [
        'The draw factor is accounted as well in the plot.'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/TeamPerformance'
    ));
    this.plots.push(new Plot(
      'Player Performance',
      'Lists the top 10 players in selected leagues based on the goals as a metric for a predefined time span',
      [
        'Note that a player can play in multiple leagues.'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/PlayerPerformance'
    ));
    this.plots.push(new Plot(
      'League Performance',
      'Displays the team\'s performance for a selected league based on the goals as a metric for a predefined time span',
      [
        'Assuming that the German Bundesliga is selected, Bayern Munich is the team with the highest overall number of goals.',
        'Assuming that the German Bundesliga is selected, the standard deviation indicates a dispersion in the distribution.',
        'Assuming that the German Bundesliga is selected, having a mean close to the median indicates a low level of skewness.',
        'Assuming that the German Bundesliga is selected, according to the box plot, Robert Lewandowski is the best player in the league.',
        'Assuming that the German Bundesliga is selected, the Covid-19 pandemic did not seem to hinder the league\'s activities.'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/LeaguePerformance'
    ));

    this.plots.push(new Plot(
      'Player Age',
      'Displays the distribution of age between all players as well as identifying whether there is a correlation between age and goals for a predefined time span',
      [
        'There is no relation between age and the goals attained (highly insignificant positive relation).',
        'There is no skewness in the distribution (indicated by the small difference in values between the mean and the median).',
        'Roughly 40% of the players have their age lie between 28 and 34.'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/PlayerAge'
    ));

    this.plots.push(new Plot(
      'League Cards',
      'Displays the distribution of yellow and red cards for selected leagues for a predefined time span',
      [
        'The Spanish Laliga obtained the highest red cards and yellow cards.',
        'The chance of obtaining a yellow card is much higher than obtaining a red card.',
        'The French Ligue has th highest chance of obtaining a red card, approximately 6.7% (Provided that obtaining any type of card is ensured).'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/LeaguesCards'
    ));

    this.plots.push(new Plot(
      'Player Nationality',
      'Displays the player\'s nationalities, in which projected on a map, and the count is denoted by the color intensity for either all leagues or for a selected league',
      [
        'Most player\'s nationalities are from Brazilian, Argentinian, or English.',
        'Most of the German Bundesliga\'s player\'s nationalities are German.',
        'Note that the same player might be counted multiple times, depending on the years they participated in the league.'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/PlayersNationalities_1'
    ));

    this.plots.push(new Plot(
      'Scatter Plot Matrix',
      'Displays the distribution between all numerical variables in the player\'s table alongside a trend line',
      [
        'The identity matrix is can always be expressed by x=y.',
        'There are 225 correlation plots.',
        'The red line denotes the linear trend line.',
        'There is a positive correlation with height and weight.',
        'There is a positive correlation with shots and shots on target (the amount of shots that guarantees a goal if the ball was not blocked).',
        'Note that the trend line should not be interpreted as a conclusive evidence, but rather as an indicator that might be liable to errors.'
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/ScatterPlotMatrix'
    ));

    this.plots.push(new Plot(
      'Yearly Attendance Hypothesis Testing',
      'Displays the attendance distribution between two samples based on year and identify whether there is a significant difference or not',
      [
        'The Covid-19 effect was visible in 2019 (indicated by the total); however, it did not severely change the attendance distribution.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceAttendance'
    ));
    this.plots.push(new Plot(
      'Club Attendance Hypothesis Testing',
      'Displays the attendance distribution between two samples based on the club and identify whether there is a significant difference or not',
      [
        'Assuming that the Bayern Munich and Barcelona are selected, there is no significant difference between the two populations; however, Bayern Munich appears to have a higher total attendance.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceAttendanceClub'
    ));
    this.plots.push(new Plot(
      'Player Position Height Hypothesis Testing',
      'Displays the height distribution between two samples based on the position of the player and identify whether there is a significant difference or not',
      [
        'There is a significant difference between the height of both goalkeepers and non-goalkeepers.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceGoalkeeperNon-GoalkeeperHeight'
    ));
    this.plots.push(new Plot(
      'Club Position Goals Hypothesis Testing',
      'Displays the goals distribution between two samples based on the position of the player and identify whether there is a significant difference or not',
      [
        'There is a significant difference between the goals of both forward players and middle-fielder players.',
        'On average, forward players score more goals than middle-fielder players.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDifferenceForwardMiddle-FielderGoals'
    ));
  }


  setDashboard(target_object: any) {
    this.is_panel_open = false;

    var selected_plot_name = ''

    if (target_object.currentTarget.children.length > 1) {
      selected_plot_name = target_object.currentTarget.children[1].innerText;
    } else {
      selected_plot_name = target_object.currentTarget.innerText;
    }

    this.current_plot = this.plots.find(x => x.title == selected_plot_name)
  }

  clearDashboard() {
    this.current_plot = undefined;
    this.is_panel_open = false;
  }
}
