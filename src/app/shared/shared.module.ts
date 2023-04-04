import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipe/safe.pipe';
import { HomeModule } from '../components/home/home.module';



@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule,
    HomeModule
  ],
  exports: [SafePipe],
})
export class SharedModule { }
