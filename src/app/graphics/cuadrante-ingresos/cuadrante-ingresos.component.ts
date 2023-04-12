import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { DateValue } from 'src/app/shared/model/date-value';
import { MarginConf } from 'src/app/shared/model/margin-conf';
@Component({
  selector: 'app-cuadrante-ingresos',
  templateUrl: './cuadrante-ingresos.component.html',
  styleUrls: ['./cuadrante-ingresos.component.css']
})
export class CuadranteIngresosComponent implements OnInit {

  ingresos:any = {
    subtotal: 12670.00,
    ivaT: 2027.00,
    ivaR: 0.00,
    isrR: 0.00,
    total: 14697.00,
    facturas: 24,
    data: []
  }

  dateValueWeek: Array<DateValue> = [
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).format()), value: 20 },
    { date: new Date(moment().set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(1, 'days').format()), value: 35 },
    { date: new Date(moment().set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(2, 'days').format()), value: 83 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(3, 'days').format()), value: 53 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(4, 'days').format()), value: 36 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(5, 'days').format()), value: 83 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(6, 'days').format()), value: 23 },
  ];

  datesValueEjemplo = [
    { date: new Date('2023-02-16 00:00:00.000000'), value: 0, media: "General" },
    { date: new Date('2023-02-17 00:00:00.000000'), value: 0, media: "General" },
    { date: new Date('2023-02-18 00:00:00.000000'), value: 0, media: "General" },
    { date: new Date('2023-02-19 00:00:00.000000'), value: 0, media: "General" },
    { date: new Date('2023-02-20 00:00:00.000000'), value: 0, media: "General" },
    { date: new Date('2023-02-21 00:00:00.000000'), value: 0, media: "General" },
    { date: new Date('2023-02-22 00:00:00.000000'), value: 0, media: "General" },
  ];

  marginBarChart?: MarginConf = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 35,
  };

  scale: 'week' | 'day'  = 'week' ;
  constructor() { }

  ngOnInit(): void {
  }

}
