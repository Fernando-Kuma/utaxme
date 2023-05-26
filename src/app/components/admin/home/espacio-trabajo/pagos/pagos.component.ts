import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  tituloProceso: string = 'ADMINISTRA PRODUCTOS/SERVICIOS'
  nombreCliente: string;
  public form: FormGroup;

  public pager:any;
  tablaLista: any;

  constructor(
    public router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let listaDummy = [
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
    this.nombreCliente = this.auth.administrador.nombre;
    this.crearForm()
    this.paginador(listaDummy)
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
    let busquedaTabla = this.tablaLista.filter( item =>
      item?.productoServicio?.toLowerCase().includes(filtro.toLowerCase()) || item?.descripcion?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);
  }


  returnFilter(){
    /* if(this.tablaListaConceptos?.length > 0){
      this.form.reset();
      this.paginador(this.tablaListaConceptos);
    }else{
      this.regresar()
    } */
  }

  abrirModal(item){
    console.log(item)
  }

}
