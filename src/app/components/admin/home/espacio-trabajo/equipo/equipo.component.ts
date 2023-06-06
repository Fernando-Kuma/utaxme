import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  metodoFormulario: string;
  usuario:any;

  tablaListaConceptos: any[] = []
  tablaLista: any[]
  
  public pager:any;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public router: Router
    ) { }

    ngOnInit(): void {
      this.usuario = 1;
      localStorage.removeItem('equipoId');
      localStorage.removeItem('pendiente');
      this.form = this.formBuilder.group({      
        busqueda: ['']
      });
      
      
      this.paginador(this.tablaListaConceptos);
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

    invitarPersona(){
      localStorage.removeItem('equipoId');
      this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.invitarPersona);
    }
  
    cambiarRol(equipo: any){
      localStorage.setItem('equipoId', equipo.idUsuario);
      this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.detalleEquipo);
    }

    onKeyDownEvent(event: any){
      let filtro = event.target.value;
      let busquedaTabla = this.tablaListaConceptos.filter( item =>
        item?.productoServicio?.toLowerCase().includes(filtro.toLowerCase()) || item?.descripcion?.toLowerCase().includes(filtro.toLowerCase())
      );
      this.paginador(busquedaTabla);
  
    }
  


    returnFilter(){
      this.form.reset();
      this.paginador(this.tablaListaConceptos);
    }
  

}
