import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationComponent } from './classification/classification.component';
import { HomeComponent } from './home/home.component';
import { PlotsComponent } from './plots/plots.component';
import { RegressionComponent } from './regression/regression.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plots/:name', component: PlotsComponent },
  { path: 'classification', component: ClassificationComponent },
  { path: 'regression', component: RegressionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
