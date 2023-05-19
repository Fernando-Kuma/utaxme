import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.css']
})
export class NuevaContrasenaComponent implements OnInit {

  hideMainPassword: boolean = true;
  hideConfPassword: boolean = true;
  title: string = 'ACTUALIZAR CONTRASEÑA';
  form: FormGroup;
  imgLoad: boolean = false;
  rfc: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private dialogService: ConfirmDialogService,
  ) { }

  ngOnInit(): void {
    this.rfc = localStorage.getItem('new-password-rfc');
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        password: [null, [
          Validators.required, 
          /* this.checkPassword */
        ]],
        confirmPassword: [null, [Validators.required]],
      },
      { validators: this.mustMatch('password', 'confirmPassword') }
    );
  }

  /* checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  } */

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (!matchingControl.value) {
        return null;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
  loadImage() {
    this.imgLoad = true;
  }

  getErrorPassword() {
    return this.form.get('password').hasError('required')
      ? 'Este campo es requerido'
      : this.form.get('password').hasError('requirements')
      ? 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un número.'
      : '';
  }

  getErrorPasswordConf() {
    return this.form.get('confirmPassword').hasError('required')
      ? 'Este campo es requerido'
      : this.form.get('confirmPassword').hasError('mustMatch')
      ? 'Las contraseñas no coinciden'
      : '';
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.dialogService.leavingBeforeSubmit()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        setTimeout(() => {
          this.router.navigateByUrl(NAV.login);
        }, 500);
      }
    );
  }

  send(): void {
    this.authService.cambiarContraseña(this.rfc,this.form.get('password').value).subscribe({
      next: (response) => {
        if (response.codigo === "200") {
          this.openConfirmDialog();
        } else {
          console.error(response.codigo);
        }
      },
      error: (_) => {
        console.error("No se pudo actualizar la contraseña");
      }
    });
    
  }

}
