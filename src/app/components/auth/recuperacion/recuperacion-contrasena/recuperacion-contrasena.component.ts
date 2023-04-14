import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {

  @ViewChild('email') email: MatInput;
  form: FormGroup;

  title: string = 'RECUPERA TU CONTRASEÑA';

  imgLoad: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
    email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._-]+\.[a-z]{1,4}$")]]
    });
  }

  loadImage() {
    this.imgLoad = true;
  }

  send(){
    
  }

  cancel() {
    this.router.navigateByUrl(NAV.nuevaContrasena); 
  }


  getError(value: string){
    if (this.form.get(value).errors?.required) {
      return 'Este campo es requerido';
    } else if(this.form.get(value).errors?.pattern){
      return 'El formato del correo no es valido';
    } 
  }

}
