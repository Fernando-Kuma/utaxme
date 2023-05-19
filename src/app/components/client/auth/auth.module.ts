import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleToolbarModule } from 'src/app/shared/utils/simple-toolbar';
import { FooterModule } from 'src/app/shared/utils/footer';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RecuperacionContrasenaComponent } from './recuperacion/recuperacion-contrasena/recuperacion-contrasena.component';
import { NuevaContrasenaComponent } from './recuperacion/nueva-contrasena/nueva-contrasena.component';
import { CodigoRecuperacionComponent } from './recuperacion/codigo-recuperacion/codigo-recuperacion.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RecuperacionContrasenaComponent,
    NuevaContrasenaComponent,
    CodigoRecuperacionComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SimpleToolbarModule,
    FooterModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatDialogModule,
    SharedModule
  ]
  
})
export class AuthModule { }
