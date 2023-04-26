import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Conceptos } from 'src/app/shared/model/espacio-trabajo.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';
import { CrearConceptoComponent } from '../generar-cfdi/crear-concepto/crear-concepto.component';
import { Paginator } from 'array-paginator';

@Component({
  selector: 'app-crear-prod-serv',
  templateUrl: './crear-prod-serv.component.html',
  styleUrls: ['./crear-prod-serv.component.css']
})
export class CrearProdServComponent implements OnInit {

  tablaListaConceptos: Conceptos[]; 
  tablaLista: Conceptos[]; 
  tituloProceso: string = 'ADMINISTRA PRODUCTOS/SERVICIOS'
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
    this.listaConceptos()
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
    if(this.tablaListaConceptos?.length > 0){
      this.form.reset();
      this.paginador(this.tablaListaConceptos);
    }else{
      this.regresar()
    }
  }

  listaConceptos(){
    let request = {
      rfc: this.auth.usuario.cliente.rfc
    }
    this.espacioTrabajoService.obtenerListaConceptos(request).subscribe((resp) => {
      resp.listaConceptos.forEach(element => {
        element.descuento = 0
        element.importe = 0
      });
      this.tablaListaConceptos = resp.listaConceptos;
      this.paginador(resp.listaConceptos);
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    });
  }

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.tablaListaConceptos.filter( item =>
      item?.descripcion?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);

  }

  crearConcepto(){
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.crearConceto()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        this.listaConceptos()
      }
    );
  }

  editarConcepto(concepto: any){
    console.log(concepto)
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.editarConcepto(concepto)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        this.listaConceptos()
      }
    );
  }

}
