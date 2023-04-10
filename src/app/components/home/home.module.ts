import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderHomeModule } from 'src/app/shared/utils/header-home';
import { HomeComponent } from './home.component';
import { GraphicsModule } from 'src/app/graphics/graphics.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GraphicsModule,
    HeaderHomeModule
  ]
})
export class HomeModule { }
