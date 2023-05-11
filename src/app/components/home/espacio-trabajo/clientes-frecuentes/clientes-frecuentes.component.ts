import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clientes-frecuentes',
  templateUrl: './clientes-frecuentes.component.html',
  styleUrls: ['./clientes-frecuentes.component.css']
})
export class ClientesFrecuentesComponent implements OnInit {

  tablaListaCliente: any[]; 
  tablaLista: any[]; 
  catalogos: any;
  tituloProceso: string = 'ADMINISTRA CLIENTES FRECUENTES'
  nombreCliente: string;
  requestDashboard: any;
  public form: FormGroup;
  public pager:any;

  constructor(
    public dialog: MatDialog,  
    private dialogService: DialogService,
    private dialogServiceConfirm: ConfirmDialogService,
    public router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
    private dashboardService: DashboardService,
    private espacioTrabajoService: EspacioTrabajoService
  ) { }

  ngOnInit(): void {
    this.nombreCliente = this.auth.usuario.nombre;
    this.requestDashboard = {
      rfc: this.auth.usuario.cliente.rfc
    }

    this.crearForm()
    this.listaClientes()
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      buscar: [null],
    });
  }

  regresar(){
    this.router.navigateByUrl(NAV.espacioTrabajo)
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
      this.form.reset();
      this.paginador(this.tablaListaCliente);
    }else{
      this.regresar()
    }
  }

  listaClientes(){
    this.espacioTrabajoService.obtenerListaFrecuentes(this.requestDashboard)
    .subscribe((response) => {
      this.tablaListaCliente = response.clientes;
      this.paginador(response.clientes);
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  obtenerCatalogos(){
    this.espacioTrabajoService.obtenerCatalogoForm()
      .subscribe((response) => {
      this.catalogos = response;
    },(_error) => {
      console.log("Error en catalogo: ", _error);
    }
    );
  }

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.tablaListaCliente.filter( item =>
      item?.nombre?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);

  }

  crearCliente(){
    const dialogRef = this.dialog.open(
      NuevoClienteComponent, 
      this.dialogService.crearCliente()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          const dialogRefConfirm = this.dialog.open( ConfirmDialogComponent, this.dialogServiceConfirm.nuevoCliente() );
          dialogRefConfirm.afterClosed().subscribe( data => { this.listaClientes() });
        }
      }
    );
  }

  editarCliente(cliente: any){
    const dialogRef = this.dialog.open(
      NuevoClienteComponent, 
      this.dialogService.editarCliente(cliente)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        const dialogRefConfirm = this.dialog.open( ConfirmDialogComponent, this.dialogServiceConfirm.editarCliente() );
        dialogRefConfirm.afterClosed().subscribe( data => { this.listaClientes() });
      }
    );
  }

  borrarCliente(cliente: any){
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.dialogServiceConfirm.eliminarCliente()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          let request  = {
            idEmisionServicios : cliente.idEmisionServicios
          }
          this.espacioTrabajoService.borrarCliente(request).subscribe((resp) => {
              console.log("Cliente frecuente eliminado correctamente: ", resp);
              this.listaClientes()
            },(_error) => {
              console.log("::Entro al error Datos fiscales: ", _error);
            });
        }
      }
    );
  }

public get width() {
  return window.innerWidth;
}


}
