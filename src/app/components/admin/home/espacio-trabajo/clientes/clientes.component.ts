import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { Paginator } from 'array-paginator';
import { AuthService } from 'src/app/shared/service/auth.service';
import { MassiveNotificationDialogComponent } from 'src/app/shared/utils/massive-notification-dialog';
import { MassiveNotificationDialogService } from 'src/app/shared/utils/massive-notification-dialog/massive-notification-dialog.service';
import { AlertService } from 'src/app/shared/utils/alertas';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Router } from '@angular/router';

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
  nombreCliente: string;
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog,
    private dialogService: MassiveNotificationDialogService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.nombreCliente = this.auth.administrador.nombreCompleto;
    this.formBuscador = this.formBuilder.group({      
      busqueda: ['']
    });
    this.obtenerClientes();
  }

  openDetalleDialog() {
    const dialogRef = this.dialog.open(
      NuevoClienteComponent,{
        height: '860px ',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe((_) => {
      this.obtenerClientes();
    });
  }

  obtenerClientes(){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth() + 1);
    this.clienteService.obtenerClientes(anio,mes)
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
      item?.razonSocial?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);

  }

  sendMassiveNotification(){
    const dialogRef = this.dialog.open(
      MassiveNotificationDialogComponent, 
      this.dialogService.sendMassiveNotification()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data == true){
          this.alertService.info('<b>¡Se ha enviado la notificación correctamente!</b>');
        }
      }
    );
  }

  regresar(){
    this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.espacioTrabajo);
  }

  validarPorcentaje(item){
    let valores = [];
    if(item.idDeclaracionMensual){
      valores.push(item.idDeclaracionMensual)
    }
    if(item.idFactura){
      valores.push(item.idFactura)
    }
    if(item.idOpinionCumplimiento){
      valores.push(item.idOpinionCumplimiento)
    }
    return (valores.length*100)/3 + '%';
  }
}
