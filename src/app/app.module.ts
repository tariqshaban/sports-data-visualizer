import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { AngularTableauModule, TABLEAU_API } from "angular-tableau";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserModule,
    AngularTableauModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: TABLEAU_API,
      useValue:
        "https://online.tableau.com/javascripts/api/tableau-2.8.0.min.js",
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
