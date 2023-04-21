import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { DatosFiscales } from 'src/app/shared/model/dashboard.mode';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfiguracionAvanzadaService } from './configuracion-avanzada/configuracion-avanzada.service';
import { ConfiguracionAvanzadaComponent } from './configuracion-avanzada/configuracion-avanzada.component';
import { ConceptosService } from './conceptos/conceptos.service';
import { ConceptosComponent } from './conceptos/conceptos.component';


@Component({
  selector: 'app-generar-cfdi',
  templateUrl: './generar-cfdi.component.html',
  styleUrls: ['./generar-cfdi.component.css']
})
export class GenerarCfdiComponent implements OnInit {

  public form: FormGroup;
  requestDashboard: any;
  tituloProceso: string = 'Crear nueva factura'
  nombreCliente: string;
  response: DatosFiscales;

  constructor(
    public dialog: MatDialog,  
    private dialogService: ConfiguracionAvanzadaService,
    private dialogServiceConcepto: ConceptosService,
    public router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.requestDashboard = {
      rfc: this.auth.usuario.cliente.rfc
    }

    this.crearForm()
    this.obtenerDatosFiscales()
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      numeroOrden: [''],
      regimenFiscal: [''],
      usoCFDI: [''],
      formaPago: [''],
      rfc: [''],
      razonSocial: [''],
      regimenFiscalCliente: [''],
      codigoPostal: [''],
      correo: ['']
    });
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.requestDashboard).subscribe((resp) => {
      this.response = resp.datosFiscales;
      /* console.log('::RESP Datos Fiscales', this.response); */
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  configuracionAvanzada(){
    const dialogRef = this.dialog.open(
      ConfiguracionAvanzadaComponent, 
      this.dialogService.detalle()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        //this.crearTicket();
      }
    );
  }

  listaConcepto(){
    const dialogRef = this.dialog.open(
      ConceptosComponent, 
      this.dialogServiceConcepto.detalle()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        //this.crearTicket();
      }
    );
  }

  regresar(){
    this.router.navigateByUrl(NAV.dashboard)
  }

}
