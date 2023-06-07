import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from 'array-paginator';
import { AlertService } from 'src/app/shared/utils/alertas';
import { MassiveNotificationDialogComponent } from 'src/app/shared/utils/massive-notification-dialog';
import { MassiveNotificationDialogService } from 'src/app/shared/utils/massive-notification-dialog/massive-notification-dialog.service';
import { NuevoClienteComponent } from '../clientes/nuevo-cliente/nuevo-cliente.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DetalleCumplimientoComponent } from './detalle-cumplimiento/detalle-cumplimiento.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-cumplimiento-fiscal',
  templateUrl: './cumplimiento-fiscal.component.html',
  styleUrls: ['./cumplimiento-fiscal.component.css']
})
export class CumplimientoFiscalComponent implements OnInit {

  tablaListaCumplimientos: any[]; 
  tablaLista: any[]; 
  public formBuscador: FormGroup;
  public pager:any;
  nombreCliente: string;
  listaDummy: any = [
    {
      id: 1,
      razonSocial: 'Paco de Miguel Lozano Real',
      rfc: 'BIL150395692',
      opinionCumplimiento: 'Positiva',
      creditosFiscales: 'No aplica',
      contadorAsignado: 'Jeniffer Gomez',
      fecha: '2023-04-14 15:47:02', 
    },
    {
      id: 2,
      razonSocial: 'Paco de Miguel Lozano Real',
      rfc: 'BIL150395692',
      opinionCumplimiento: 'Positiva',
      creditosFiscales: 'No aplica',
      contadorAsignado: 'Lesley Mejia',
      fecha: '2023-04-14 15:47:02', 
    },
    {
      id: 3,
      razonSocial: 'Paco de Miguel Lozano Real',
      rfc: 'BIL150395692',
      opinionCumplimiento: 'Positiva',
      creditosFiscales: 'No aplica',
      contadorAsignado: 'Jeniffer Gomez',
      fecha: '2023-04-14 15:47:02', 
    },
    {
      id: 4,
      razonSocial: 'Paco de Miguel Lozano Real',
      rfc: 'BIL150395692',
      opinionCumplimiento: 'Positiva',
      creditosFiscales: 'No aplica',
      contadorAsignado: 'Lesley Mejia',
      fecha: '2023-04-14 15:47:02', 
    },
    {
      id: 5,
      razonSocial: 'Paco de Miguel Lozano Real',
      rfc: 'BIL150395692',
      opinionCumplimiento: 'Positiva',
      creditosFiscales: 'No aplica',
      contadorAsignado: 'Jeniffer Gomez',
      fecha: '2023-04-14 15:47:02', 
    },
    {
      id: 6,
      razonSocial: 'Paco de Miguel Lozano Real',
      rfc: 'BIL150395692',
      opinionCumplimiento: 'Positiva',
      creditosFiscales: 'No aplica',
      contadorAsignado: 'Lesley Mejia',
      fecha: '2023-04-14 15:47:02', 
    },
  ]
  
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.nombreCliente = this.auth.administrador.nombreCompleto;
    this.formBuscador = this.formBuilder.group({      
      busqueda: ['']
    });
    this.obtenerClientes();
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

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.tablaListaCumplimientos.filter( item =>
      item?.razonSocial?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);

  }

  obtenerClientes(){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth() + 1);
    this.tablaListaCumplimientos = this.listaDummy;
    this.paginador(this.listaDummy);
    /* this.clienteService.obtenerClientes(anio,mes)
      .subscribe((response) => {
        console.log("Clientes:",response);
        this.tablaListaCliente = response.data;
        this.paginador(response.data);
      },(_error) => {
        console.log("Error en obtener clientes: ", _error);
      }); */
  }

  detalleCumplimiento(item){
    const dialogRef = this.dialog.open(
      DetalleCumplimientoComponent, 
      this.dialogService.editarDetalleCumplimiento(item)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
      }
    );
  }
}
