import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipe/safe.pipe';
import { HomeModule } from '../components/home/home.module';
import { MaskPipe } from './pipe/mask.pipe';
import { PincodeComponent } from './utils/pincode/pincode.component';
import { TimerComponent } from './utils/timer/timer.component';
import { PincodeModule } from './utils/pincode';
import { TimerModule } from './utils/timer';



@NgModule({
  declarations: [
    SafePipe, 
    MaskPipe, 
    
],
  imports: [
    CommonModule,
    HomeModule,
    PincodeModule,
    TimerModule
    
  ],
  exports: [
    SafePipe,
    MaskPipe,
    PincodeComponent,
    TimerComponent
  ],
})
export class SharedModule { }
