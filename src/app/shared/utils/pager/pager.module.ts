import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager.component';



@NgModule({
  declarations: [PagerComponent],
  imports: [
    CommonModule
  ],
  exports: [PagerComponent],
})
export class PagerModule { }
