import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditpageComponent } from './editpage/editpage.component';
import { CreatepageComponent } from './createpage/createpage.component';
import { StatisticspageComponent } from './statisticspage/statisticspage.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineChartAllTimeComponent } from './line-chart-all-time/line-chart-all-time.component';
import { PolarChartComponent } from './polar-chart/polar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    HomepageComponent,
    NavbarComponent,
    EditpageComponent,
    CreatepageComponent,
    StatisticspageComponent,
    LineChartComponent,
    LineChartAllTimeComponent,
    PolarChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    DialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'edit/:id', component: EditpageComponent },
      { path: 'create', component: CreatepageComponent },
      { path: 'stats', component: StatisticspageComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
