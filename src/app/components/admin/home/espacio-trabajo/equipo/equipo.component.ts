import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EquipoService } from 'src/app/shared/service/equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  metodoFormulario: string;
  usuario:any;

  tablaListaEquipo: any[] = []
  tablaLista: any[]
  
  public pager:any;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private equipoService: EquipoService,
    public router: Router,
    private auth: AuthService,
    ) { }

    ngOnInit(): void {
      this.usuario = 1;
      this.form = this.formBuilder.group({      
        busqueda: ['']
      });
      this.listaEquipo()

    }
    
    listaEquipo(){
      this.equipoService.obtenerEquipo().subscribe((response) => {
        if(response.length > 0){
          this,this.tablaListaEquipo = response
        }
        this.paginador(this.tablaListaEquipo);
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

    invitarPersona(){
      localStorage.removeItem('dataUser');
      localStorage.removeItem('pendiente');
      this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.invitarPersona);
    }
  
    cambiarRol(equipo: any){
      localStorage.setItem('dataUser', JSON.stringify(equipo));
      this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.detalleEquipo);
    }

    onKeyDownEvent(event: any){
      let filtro = event.target.value;
      let busquedaTabla = this.tablaListaEquipo.filter( item =>
        item?.nombreCompleto?.toLowerCase().includes(filtro.toLowerCase())
      );
      this.paginador(busquedaTabla);
  
    }
  


    returnFilter(){
      this.form.reset();
      this.paginador(this.tablaListaEquipo);
    }
  

}
