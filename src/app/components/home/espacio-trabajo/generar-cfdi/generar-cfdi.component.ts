import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { DatosFiscales } from 'src/app/shared/model/dashboard.mode';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfiguracionAvanzadaComponent } from './configuracion-avanzada/configuracion-avanzada.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { Conceptos } from 'src/app/shared/model/espacio-trabajo.model';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';



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
  
  regimenFiscal: any;
  catalogos: any;
  listaClientes: any;
  response: DatosFiscales;

  tablaListaConceptos: Conceptos[]; 

  filteredOptions: Observable<any[]>;

  constructor(
    public dialog: MatDialog,  
    private dialogService: DialogService,
    public router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
    private dashboardService: DashboardService,
    private espacioTrabajoService: EspacioTrabajoService) {
      }

  ngOnInit(): void {

    this.nombreCliente = this.auth.usuario.nombre;
    this.requestDashboard = {
      rfc: this.auth.usuario.cliente.rfc
    }

    this.crearForm()
    this.obtenerDatosFiscales()
    this.obtenerCatalogos()
    this.obtenerRegimenFiscal()
    this.obtenerListaClientesFrecuentes()

    
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      numeroOrden: [null, [Validators.required, Validators.minLength(3)]],
      regimenFiscal: [null, [Validators.required]],
      usoCFDI: [null, [Validators.required]],
      formaPago: [null, [Validators.required]],
      rfc: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      razonSocial: [null, [Validators.required, Validators.minLength(3)]],
      regimenFiscalCliente: [null, [Validators.required]],
      codigoPostal: [null, [Validators.required, Validators.minLength(5)]],
      correo: [null, [Validators.required, Validators.pattern(".+@.+\..+")]],
    });
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.requestDashboard).subscribe((resp) => {
      this.response = resp.datosFiscales;
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

  obtenerRegimenFiscal(){
    this.espacioTrabajoService.obtenerRegimenFiscal(this.requestDashboard)
    .subscribe((response) => {
      this.regimenFiscal =  response.lista
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  obtenerListaClientesFrecuentes(){
    this.espacioTrabajoService.obtenerListaFrecuentes(this.requestDashboard)
    .subscribe((response) => {
      this.listaClientes =  response.clientes
      this.filteredOptions = this.form.controls['rfc'].valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.listaClientes.slice()),
      );
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  configuracionAvanzada(){
    const dialogRef = this.dialog.open(
      ConfiguracionAvanzadaComponent, 
      this.dialogService.configuracionAvanzada(this.catalogos.catalogoMetodoPago)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        //this.crearTicket();
      }
    );
  }


  listaConcepto(){
    if(!this.form.valid){
      const dialogRef = this.dialog.open(
        ConceptosComponent, 
        this.dialogService.tablaConceptos(this.tablaListaConceptos)
      );
      dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.tablaListaConceptos = data;
            console.log(this.tablaListaConceptos)
          }
        }
      );
    }
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
    }
  }

  
  selecionarCliente(cliente: any){
    this.form.get('razonSocial').setValue(cliente.razonSocial);
    this.form.get('regimenFiscalCliente').setValue(cliente.regimenFiscal);
    this.form.get('codigoPostal').setValue(cliente.codigoPostal);
    this.form.get('correo').setValue(cliente.correoElectronico);
  }

  regresar(){
    this.router.navigateByUrl(NAV.dashboard)
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  getErrorCaracteres(cantidad: number){
    return 'Ingrese al menos ' + cantidad + ' caracteres';
  }

  public onlyNumbers(event) {
    let k;
    k = event.charCode;
    return (!(k > 31 && (k < 48 || k > 57)));
  }

  get formulario() {
    return this.form.controls;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    return this.listaClientes.filter(item => item.rfcCliente.toLowerCase().includes(filterValue));
  }
  
}
