import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { AdministrarPagosService } from 'src/app/shared/service/administrar-pagos.service';
import { MassiveNotificationDialogComponent } from 'src/app/shared/utils/massive-notification-dialog';
import { AlertService } from 'src/app/shared/utils/alertas';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  tituloProceso: string = 'ADMINISTRACIÓN DE PAGOS'
  nombreCliente: string;
  public form: FormGroup;

  public pager:any;
  tablaLista: any;
  listaDummy: any = [
    {
      id: 1,
      razonSocial: 'Paco de Miguel Lozano Real',
      paquete: 'Básico',
      montoPaquete: 599,
      montoComplementos: 322,
      total: 4441.1,
      estatusMensual: 'Facturado', 
    },
    {
      id: 2,
      razonSocial: 'Paco de Miguel Lozano Real',
      paquete: 'Avanzado',
      montoPaquete: 599,
      montoComplementos: 322,
      total: 2567.1,
      estatusMensual: 'No emitida', 
    },
    {
      id: 3,
      razonSocial: 'Paco de Miguel Lozano Real',
      paquete: 'Premium',
      montoPaquete: 599,
      montoComplementos: 322,
      total: 2567.1,
      estatusMensual: 'Cancelado', 
    },
    {
      id: 4,
      razonSocial: 'Paco de Miguel Lozano Real',
      paquete: 'Avanzado',
      montoPaquete: 599,
      montoComplementos: 322,
      total: 2567.1,
      estatusMensual: 'Cancelado', 
    },
  ]
  showAutocomplete: boolean = true;
  listadoPagos: any[] = [];

  constructor(
    public dialog: MatDialog,  
    private alertService: AlertService,
    private dialogService: DialogService,
    public router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private administrarPagosService: AdministrarPagosService
  ) { }

  ngOnInit(): void {
    
    this.nombreCliente = this.auth.administrador.nombreCompleto;
    this.crearForm()
    
    this.obtenerClientesPago()
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      buscar: [null],
    });
  }

  regresar(){
    this.router.navigateByUrl(NAV.homeAdmin +'/'+ NAV.espacioTrabajo)
  }

  tablaConceptos(){
    this.router.navigateByUrl(NAV.homeAdmin +'/'+ NAV.administraConceptos)
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

  obtenerClientesPago(){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth() + 1);
    this.administrarPagosService.obtenerClientesPago(anio,mes)
      .subscribe((response) => {
        if(response.httpStatus == 200){
          response.data.forEach(ele => {
            ele.montoComplementos = Number(ele.montoComplementos)
            ele.total = Number(ele.total)
            ele.montoPaquete = Number(ele.montoPaquete)
            if(ele.estatusMensual == 1){
              ele.descripcionEstatus = 'Cancelado'
            }else if(ele.estatusMensual == 0){
              ele.descripcionEstatus = 'Facturado'
            }else{
              ele.descripcionEstatus = 'No Emitido'
            }
          });
          this.listadoPagos = response.data
          console.log("Clientes: ",this.listadoPagos);
          this.paginador(this.listadoPagos)
        }
      },(_error) => {
        console.log("Error en obtener clientes: ", _error);
      });
  }

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.listadoPagos.filter( item =>
      item?.razonSocial?.toLowerCase().includes(filtro.toLowerCase())
      );
      console.log(busquedaTabla)
    this.paginador(busquedaTabla);
    if(filtro.length > 0) {
      this.showAutocomplete = false;
    }else{
      this.showAutocomplete = true;
    }
  }

  opcionFiltro(condicion: any){
    console.log(condicion)
    let busquedaTabla = this.listadoPagos.filter( item =>
      item.estatusMensual == condicion
    );
    this.paginador(busquedaTabla);
  }

  detallePagoCliente(item){
    const dialogRef = this.dialog.open(
      DetallePagoComponent, 
      this.dialogService.editarPagoCliente(item.id)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
      }
    );
  }


  
  returnFilter(){
    this.form.reset();
    this.paginador(this.listadoPagos);
  }

  abrirModal(item){
  }
  
  enviarNotificaciones(){
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
}
