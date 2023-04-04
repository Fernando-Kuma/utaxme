import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from './header-home.component';



@NgModule({
  declarations: [HeaderHomeComponent],  
  imports: [
    CommonModule
  ],
  exports: [HeaderHomeComponent]
})
export class HeaderHomeModule { }
