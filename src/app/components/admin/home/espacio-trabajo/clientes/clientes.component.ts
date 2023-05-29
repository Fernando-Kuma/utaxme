import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { Paginator } from 'array-paginator';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  tablaListaCliente: any[]; 
  tablaLista: any[]; 
  public formBuscador: FormGroup;
  public pager:any;
  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.formBuscador = this.formBuilder.group({      
      busqueda: ['']
    });
    this.obtenerClientes();
  }

  openDetalleDialog() {
    this.dialog.open(
      NuevoClienteComponent,{
        height: '760px ',
        disableClose: true
      }
    );
  }

  obtenerClientes(){
    this.clienteService.obtenerClientes()
      .subscribe((response) => {
        console.log("Clientes:",response);
        this.tablaListaCliente = response.data;
        this.paginador(response.data);
      },(_error) => {
        console.log("Error en obtener clientes: ", _error);
      });
  }

  onPaged(page) {
    this.tablaLista = this.pager.page(page);
  }

  paginador(value: any){
    this.pager = new Paginator(value,6,1)
    if(value.length > 0){
      this.tablaLista = this.pager.page(1);  
    }else{
      this.tablaLista = []
    }
  }

  returnFilter(){
    if(this.tablaListaCliente?.length > 0){
      this.formBuscador.reset();
      this.paginador(this.tablaListaCliente);
    }
  }

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.tablaListaCliente.filter( item =>
      item?.nombre?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);

  }
}
