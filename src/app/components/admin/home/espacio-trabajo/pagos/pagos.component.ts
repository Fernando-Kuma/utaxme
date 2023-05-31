import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';

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

  constructor(
    public dialog: MatDialog,  
    private dialogService: DialogService,
    public router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.nombreCliente = this.auth.administrador.nombreCompleto;
    this.crearForm()
    this.paginador(this.listaDummy)
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      buscar: [null],
    });
  }

  regresar(){
    this.router.navigateByUrl(NAV.homeAdmin +'/'+ NAV.espacioTrabajo)
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

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.listaDummy.filter( item =>
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

  opcionFiltro(texto: any){
    let busquedaTabla = this.listaDummy.filter( item =>
      item?.estatusMensual?.toLowerCase().includes(texto.toLowerCase())
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
    this.paginador(this.listaDummy);
  }

  abrirModal(item){
    console.log(item)
  }

}
