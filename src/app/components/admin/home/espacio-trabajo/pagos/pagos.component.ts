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
    this.nombreCliente = this.auth.administrador.nombre;
    this.crearForm()
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

}
