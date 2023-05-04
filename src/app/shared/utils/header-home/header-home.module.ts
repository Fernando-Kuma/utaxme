import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from './header-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationsModule } from '../notifications';



@NgModule({
  declarations: [HeaderHomeComponent],  
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterModule,
    NotificationsModule
  ],
  exports: [HeaderHomeComponent]
})
export class HeaderHomeModule { }
