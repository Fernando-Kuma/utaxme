import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Paginator } from 'array-paginator';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {
  selected = -1;
  tablaLista: any[]; 
  listaDummy: any = [
    {
      cambio: false,
      folio: 'UTAXME-01',
      nombre: 'Guillermo Alfonso Zaragoza',
      correo: 'prueba@gmail.com',
      password: '3456789aB*'
    },
    {
      cambio: false,
      folio: 'UTAXME-02',
      nombre: 'Santo Alfonso Zaragoza',
      correo: 'prueba@gmail.com',
      password: '3456789aB*'
    },
    {
      cambio: false,
      folio: 'UTAXME-03',
      nombre: 'Juan Alfonso Zaragoza',
      correo: 'prueba@gmail.com',
      password: '3456789aB*'
    },
    {
      cambio: false,
      folio: 'UTAXME-04',
      nombre: 'Manuel Alfonso Zaragoza',
      correo: 'prueba@gmail.com',
      password: '3456789aB*'
    },
    {
      cambio: false,
      folio: 'UTAXME-05',
      nombre: 'Rosa Alfonso Zaragoza',
      correo: 'prueba@gmail.com',
      password: '3456789aB*'
    },
    {
      cambio: false,
      folio: 'UTAXME-06',
      nombre: 'Miguel Alfonso Zaragoza',
      correo: 'prueba@gmail.com',
      password: '123456789aB*'
    },
  ]
  public form: FormGroup;
  public pager:any;
  objCliente:any;
  constructor(
    public dialogRef: MatDialogRef<BuscarClienteComponent>,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.paginador(this.listaDummy);
  }


  crearForm(){
    this.form = this.formBuilder.group({      
      busqueda: ['']
    });
  }

  selectDispositivo(item,i){
    if(this.tablaLista[i].cambio){
      this.tablaLista[i].cambio = false;
      this.objCliente = {};
    }else{
      this.limpiarCheck();
      this.tablaLista[i].cambio = true;
      this.objCliente = item;
    }

    console.log("TODOS:",this.tablaLista);
    console.log("Seleccionaste:",this.objCliente);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.listaDummy.filter( item => 
    item?.nombre.toLowerCase().includes(filtro.toLowerCase())
    )
    this.limpiarCheck();
    this.paginador(busquedaTabla);
  }

  onPaged(page) {
    this.tablaLista = this.pager.page(page);
  }

  paginador(value: any){
    this.pager = new Paginator(value,4,1)
    if(value.length > 0){
      this.tablaLista = this.pager.page(1);  
    }else{
      this.tablaLista = []
    }
  }

  returnFilter(){
    if(this.listaDummy?.length > 0){
      this.form.reset();
      this.paginador(this.listaDummy);
    }else{
      this.closeDialog();
    }
  }

  limpiarCheck(){
    this.objCliente = {};
    this.tablaLista.forEach( ele => {
      ele.cambio = false;
    }); 
  }

  confirmDialog() {
    this.dialogRef.close(this.objCliente);
  }

}
