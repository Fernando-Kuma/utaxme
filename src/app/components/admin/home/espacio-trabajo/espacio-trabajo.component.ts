import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-espacio-trabajo',
  templateUrl: './espacio-trabajo.component.html',
  styleUrls: ['./espacio-trabajo.component.css']
})
export class EspacioTrabajoAdminComponent implements OnInit {

   tabLoadTimes: Date[] = [];
  selected = new FormControl(0);
  user: any;
  nombreCliente: any;

  constructor(
    private router: Router,
    private auth: AuthService, 
  ) { }

  ngOnInit(): void {
    this.nombreCliente = this.auth.administrador.nombre;

    let tabSeleccionada = localStorage.getItem('workspace');
    if(tabSeleccionada != null){
      this.selectTab(Number(tabSeleccionada));
    }
  }


  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }

  selectTab(index: number){
    this.selected.setValue(index);
  }

  tabChange(index: any){
    localStorage.setItem('workspace', index);
  }


}
