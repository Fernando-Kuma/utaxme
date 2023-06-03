import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './header-admin.component';
import { NotificationsModule } from '../notifications';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderHomeComponent } from '../header-home';



@NgModule({
  declarations: [
    HeaderAdminComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatMenuModule, 
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterModule,
    NotificationsModule
  ],
  exports: [HeaderAdminComponent]
})
export class HeaderAdminModule { }
