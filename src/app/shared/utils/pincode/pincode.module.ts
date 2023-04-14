import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PincodeComponent } from './pincode.component';
import { TimerModule } from '../timer';
import { CodeInputModule } from 'angular-code-input';



@NgModule({
  imports: [
    RouterModule, 
    FormsModule, 
    CodeInputModule, 
    ReactiveFormsModule, 
    CommonModule, 
    TimerModule
  ],
  declarations: [
    PincodeComponent
  ],
  exports: [
    PincodeComponent
  ],
})
export class PincodeModule { }
