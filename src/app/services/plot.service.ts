import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Info, QA } from '../models/info';
import { TitleService } from './title.service';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  _plots: Info[] = [];
  _selectedPlot: Info | undefined;
  selectedPlotChange: Subject<Info | undefined> = new Subject<Info | undefined>();


  constructor(_titleService: TitleService) {
    this.selectedPlotChange.subscribe((value) => {
      if (value !== undefined) {
        _titleService.setTitle(value.title);
      }
      else {
        _titleService.setTitle('');
      }
      this._selectedPlot = value
    });

    this._plots.push(new Info(
      'Countries Attendance',
      'Visualizes each country\'s share of attendance for a predefined time span',
      [
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      [
        new QA('Which country is the highest hosting country?', 'England, regardless of the year.'),
        new QA('What is the total recorded attendance?', 'Roughly 2.4 billion.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/CountryAttendance',
      ''
    ));
    this._plots.push(new Info(
      'Stadium Attendance',
      'Visualizes each stadium\'s share of attendance for a predefined time span',
      [
        'The usage of the symbol plot here is discouraged because the number of stadiums is of monumental proportions.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      [
        new QA('Which stadium has the highest attendance overall?', 'Old Trafford.'),
        new QA('How much is the aggregated attendance for the top 15 stadiums?', '330 million, during the span of 2001 and 2021, this value is small compared to the total amount since there are many null values.'),
        new QA('What is the total recorded attendance?', 'Roughly 2.4 billion.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/StadiumAttendance',
      ''
    ));
    this._plots.push(new Info(
      'Teams Attendance',
      'Visualizes each team\'s share of attendance for a predefined time span',
      [
        'The highest 15 teams in attendance aggregated to 555 million, during the span of 2001 and 2021.',
        'Most of the highest 15 teams represents England, this indicated that there is a relationship between a country and its teams regarding the attendance.',
        'It can be noted that the aggregation of all teams is nearly double the total attendance since two teams participate in a match, which leads to counting the attendance twice.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      [
        new QA('Which stadium has the highest attendance overall?', 'Old Trafford.'),
        new QA('How much is the aggregated attendance for the top 15 teams?', '555 million, during the span of 2001 and 2021, this value is small compared to the total amount since there are many null values.'),
        new QA('What is the total recorded attendance?', 'Roughly 2.4 billion.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/TeamAttendance',
      ''
    ));
    this._plots.push(new Info(
      'Worldwide Attendance',
      'Visualizes the overall attendance fluctuation for a predefined time span (Displayed yearly, monthly, and daily)',
      [
        'Plots indicate a severe drop in the attendance between year 2020 and 2021; this is due to the strict precautions enforced in response to the Covid-19 pandemic.',
        'The mean is much higher than the median, this indicates that the distribution is heavily skewed to the right (positive skewness).'
      ],
      [
        new QA('Which year had the highest recorded attendance?', '2019.'),
        new QA('Which month(s) have relatively higher attendance?', 'September and October.'),
        new QA('Which month(s) have relatively lower attendance?', 'June and July.'),
        new QA('Which day(s) of the week has relatively higher attendance?', 'Saturday and Sunday (during the weekends).'),
        new QA('Which day(s) of the week has relatively higher number of matches?', 'Saturday and Sunday (during the weekends).'),
        new QA('What is the total recorded attendance?', 'Roughly 2.4 billion.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/WorldwideAttendance',
      ''
    ));

    this._plots.push(new Info(
      'Teams Performance',
      'Compares between two teams based on the percentage of wins as a metric for a predefined time span',
      [
        'The draw factor is accounted as well in the plot.'
      ],
      [
        new QA('Who has the highest wins between Bayern Munich and Barcelona in head-to-head matches?', 'Bayern Munich.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/TeamPerformance',
      ''
    ));
    this._plots.push(new Info(
      'Player Performance',
      'Lists the top 10 players in selected leagues based on the goals as a metric for a predefined time span',
      [
        'Note that a player can play in multiple leagues.'
      ],
      [
        new QA('Who is the best player in the German Bundesliga?', 'Robert Lewandowski.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/PlayerPerformance',
      ''
    ));
    this._plots.push(new Info(
      'League Performance',
      'Displays the team\'s performance for a selected league based on the goals as a metric for a predefined time span',
      [
        'Assuming that the German Bundesliga is selected, the standard deviation indicates a dispersion in the distribution.',
        'Assuming that the German Bundesliga is selected, having a mean close to the median indicates a low level of skewness.',
        'Assuming that the German Bundesliga is selected, the Covid-19 pandemic did not seem to hinder the league\'s activities.'
      ],
      [
        new QA('Which team has the highest number of goals in the German Bundesliga?', 'Bayern Munich.'),
        new QA('Who is the best player in the German Bundesliga, using the goals as a metric?', 'Robert Lewandowski, by using the box plot.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/LeaguePerformance',
      ''
    ));

    this._plots.push(new Info(
      'Player Age',
      'Displays the distribution of age between all players as well as identifying whether there is a correlation between age and goals for a predefined time span',
      [
        'There is no skewness in the distribution (indicated by the small difference in values between the mean and the median).',
        'Roughly 40% of the players have their age lie between 28 and 34.'
      ],
      [
        new QA('Is there a correlation between the age and the attained goals?', 'No, the trend line indicates a highly insignificant positive relation.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/PlayerAge',
      ''
    ));

    this._plots.push(new Info(
      'League Cards',
      'Displays the distribution of yellow and red cards for selected leagues for a predefined time span',
      [
        'The French Ligue has th highest chance of obtaining a red card, approximately 6.7% (Provided that obtaining any type of card is ensured).'
      ],
      [
        new QA('Which league has the highest number of cards?', 'The Spanish LaLiga.'),
        new QA('Which is more common, to obtain a yellow card, or a red card?', 'The chance of obtaining a yellow card is much higher than obtaining a red card.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/LeaguesCards',
      ''
    ));

    this._plots.push(new Info(
      'Player Nationality',
      'Displays the player\'s nationalities, in which projected on a map, and the count is denoted by the color intensity for either all leagues or for a selected league',
      [
        'Note that the same player might be counted multiple times, depending on the years they participated in the league.'
      ],
      [
        new QA('Which nationalities are the highest in general?', 'Brazilian, Argentinian, and English nationalities.'),
        new QA('Which nationalities are the highest in the German Bundesliga?', 'German nationality.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/PlayersNationalities_1',
      ''
    ));

    this._plots.push(new Info(
      'Scatter Plot Matrix',
      'Displays the distribution between all numerical variables in the player\'s table alongside a trend line',
      [
        'The identity matrix is always expressed by x=y.',
        'There are 225 correlation plots.',
        'The red line denotes the linear trend line.',
        'Note that the trend line should not be interpreted as a conclusive evidence, but rather as an indicator that might be liable to errors.'
      ],
      [
        new QA('Specify the correlation type between \'height\' and \'weight\'?', 'Positive correlation.'),
        new QA('Specify the correlation type between \'shots\' and \'shots on target\'?', 'Positive correlation.'),
        new QA('Specify the correlation type between \'assists\' and \'goals\'?', 'Weak positive correlation.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/ScatterPlotMatrix',
      ''
    ));

    this._plots.push(new Info(
      'Yearly Attendance Hypothesis Testing',
      'Displays the attendance distribution between two samples based on year and identify whether there is a significant difference or not',
      [
        'The Covid-19 effect was visible in 2019 (indicated by the total); however, it did not severely change the attendance distribution.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      [
        new QA('Is there a significant difference in attendance between year 2002 and 2003?', 'No.'),
        new QA('Is there a significant difference in attendance between year 2019 and 2020?', 'Yes, the attendance in 2019 was higher.'),
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceAttendance',
      ''
    ));
    this._plots.push(new Info(
      'Club Attendance Hypothesis Testing',
      'Displays the attendance distribution between two samples based on the club and identify whether there is a significant difference or not',
      [
        'Assuming that the Bayern Munich and Barcelona are selected, there is no significant difference between the two populations; however, Bayern Munich appears to have a higher total attendance.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      [
        new QA('Is there a significant difference in attendance between Bayern Munich and Barcelona?', 'No, however, the attendance mean for Bayern Munich is slightly higher.'),
        new QA('Is there a significant difference in attendance between Bayern Munich and Liverpool?', 'Yes, the attendance for Bayern Munich is higher.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceAttendanceClub',
      ''
    ));
    this._plots.push(new Info(
      'Player Position Height Hypothesis Testing',
      'Displays the height distribution between two samples based on the position of the player and identify whether there is a significant difference or not',
      [
        'There is a significant difference between the height of both goalkeepers and non-goalkeepers.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      [
        new QA('Is there a significant difference in height between goalkeepers and other positions?', 'Yes, goalkeepers appear to be taller.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDiffereanceGoalkeeperNon-GoalkeeperHeight',
      ''
    ));
    this._plots.push(new Info(
      'Player Position Goals Hypothesis Testing',
      'Displays the goals distribution between two samples based on the position of the player and identify whether there is a significant difference or not',
      [
        'There is a significant difference between the goals of both forward players and middle-fielder players.',
        'On average, forward players score more goals than middle-fielder players.',
        'Two samples can be considered insignificantly different when their confidence interval overlap.',
        'The bold line represent the mean, while the dotted line represent the confidence interval.',
        'A wider confidence interval indicates instability, either because the data is inconsistent (highly variable) or the size is too small.',
      ],
      [
        new QA('Is there a significant difference in goals between forward and middle-field players?', 'Yes, forward players appear to achieve more goals.')
      ],
      'https://public.tableau.com/views/Soccer_16469397037610/SignificantDifferenceForwardMiddle-FielderGoals',
      ''
    ));
  }

  getPlots() {
    return this._plots;
  }

  getPlotByName(name: any) {
    return this._plots.find(x => x.title == name)
  }

  getSelectedPlot() {
    return this._selectedPlot;
  }

  setSelectedPlot(plot: Info | undefined) {
    this.selectedPlotChange.next(plot);
  }
}
