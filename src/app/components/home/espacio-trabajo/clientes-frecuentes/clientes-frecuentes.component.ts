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

@Component({
  selector: 'app-clientes-frecuentes',
  templateUrl: './clientes-frecuentes.component.html',
  styleUrls: ['./clientes-frecuentes.component.css']
})
export class ClientesFrecuentesComponent implements OnInit {

  tablaListaCliente: any[]; 
  tablaLista: any[]; 
  tituloProceso: string = 'ADMINISTRA CLIENTES FRECUENTES'
  nombreCliente: string;
  public form: FormGroup;
  public pager:any;

  constructor(
    public dialog: MatDialog,  
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    public router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
    private dashboardService: DashboardService,
    private espacioTrabajoService: EspacioTrabajoService
  ) { }

  ngOnInit(): void {
    this.nombreCliente = this.auth.usuario.nombre;
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
    let request = {
      rfc: this.auth.usuario.cliente.rfc
    }
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
        this.listaClientes()
      }
    );
  }

  editarCliente(cliente: any){
    const dialogRef = this.dialog.open(
      NuevoClienteComponent, 
      this.dialogService.editarConcepto(cliente)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        this.listaClientes()
      }
    );
  }

  borrarCliente(){
    
  }

}
