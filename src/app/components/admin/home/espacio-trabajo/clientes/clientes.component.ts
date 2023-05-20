import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDetalleDialog() {
    this.dialog.open(
      NuevoClienteComponent
    );
  }

}
