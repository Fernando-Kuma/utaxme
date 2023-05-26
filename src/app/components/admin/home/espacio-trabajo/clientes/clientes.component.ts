import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public formBuscador: FormGroup;
  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formBuscador = this.formBuilder.group({      
      busqueda: ['']
    });
  }

  openDetalleDialog() {
    this.dialog.open(
      NuevoClienteComponent,{
        height: '760px ',
        disableClose: true
      }
    );
  }


}
