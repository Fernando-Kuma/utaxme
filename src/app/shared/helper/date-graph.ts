import * as moment from 'moment';

export class Constantes {

    //FECHA - HORA ACTUAL
    public static FECHA_HORA_ACTUAL_VOZ = "2023-03-24T00:00:00";/* (moment().format().substring(0,19)); */
    public static FECHA_RENDIMIENTO_CALENDARIO_VOZ = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format().substring(0,19));
    public static FECHA_LLAMADAS_VOZ_1 = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'second': 0, 'millisecond': 0}).subtract(1, 'hour').format().substring(0,19));
    public static FECHA_LLAMADAS_VOZ_12 = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hour').format().substring(0,19));
    public static FECHA_LLAMADAS_VOZ_24 = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hour').format().substring(0,19));
    public static FECHA_LLAMADAS_VOZ_7 = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format().substring(0,19));
    public static FECHA_DURACION_LLAMADAS_VOZ_1 = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'second': 0, 'millisecond': 0}).subtract(1, 'hour').format().substring(0,19));
    public static FECHA_VOZ = (moment(Constantes.FECHA_HORA_ACTUAL_VOZ).set({'second': 0, 'millisecond': 0}).subtract(1, 'hour').format().substring(0,19));

    public static FECHA_HORA_ACTUAL ="2023-02-28T23:59:59"
    /* public static FECHA_HORA_ACTUAL = "2023-02-28T23:59:00" */
    public static FECHA_ACTUAL_SITIOS = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format().substring(0,19));
//GLOBAL
    //FECHA A 7 DIAS ATRAS
    //public static FECHA_INICIO_GLOBAL_VISTA_GENERAL ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_VISTA_GENERAL = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format()).substring(0,19);
    /* public static FECHA_INICIO_GLOBAL_METRICAS ="2023-02-13T00:00:00"; */
    public static FECHA_INICIO_GLOBAL_METRICAS = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(6, 'days').format()).substring(0,19);

    //FECHA A 30 DIAS ATRAS
    public static FECHA_INICIO_GLOBAL_VISTA_GENERAL_FULL ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_GLOBAL_VISTA_GENERAL_FULL = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(30, 'days').format()).substring(0,19); */

    //FECHA PRIMER DIA DEL MES ACTUAL
    public static FECHA_INICIO_GLOBAL_ALARMAS ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_ALARMAS_5 = (moment(Constantes.FECHA_HORA_ACTUAL).set({ 'second': 0, 'millisecond': 0}).subtract(4, 'minute').format()).substring(0,19);
    /* public static FECHA_INICIO_GLOBAL_ALARMAS = (moment(Constantes.FECHA_HORA_ACTUAL).startOf('month').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format()).substring(0,19); */
    //public static FECHA_INICIO_GLOBAL_ALARMAS_BURBUJAS ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_ALARMAS_BURBUJAS = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    //public static FECHA_INICIO_GLOBAL_ALARMAS_TABLA ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_ALARMAS_TABLA = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    public static FECHA_INICIO_GLOBAL_TICKET ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_GLOBAL_TICKET = (moment(Constantes.FECHA_HORA_ACTUAL).startOf('month').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format()).substring(0,19); */
    public static FECHA_INICIO_GLOBAL_ENCABEZADO ="2023-02-21T00:00:00";
    /* public static FECHA_INICIO_GLOBAL_ENCABEZADO = (moment(Constantes.FECHA_HORA_ACTUAL).startOf('month').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format()).substring(0,19); */

    //FECHA POR HORA
    //public static FECHA_INICIO_GLOBAL_AFECTACIONES_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_AFECTACIONES_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    public static FECHA_INICIO_GLOBAL_AFECTACIONES_48 ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_GLOBAL_AFECTACIONES_48 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(48, 'hours').format()).substring(0,19); */
    public static FECHA_INICIO_GLOBAL_AFECTACIONES_72 ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_GLOBAL_AFECTACIONES_72 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(72, 'hours').format()).substring(0,19); */

    //public static FECHA_INICIO_GLOBAL_METRICAS_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_METRICAS_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    //public static FECHA_INICIO_GLOBAL_METRICAS_12 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_GLOBAL_METRICAS_12 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    public static FECHA_INICIO_GLOBAL_METRICAS_1 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'second': 0, 'millisecond': 0}).subtract(59, 'minute').format()).substring(0,19);

//MAPA
    //FECHA A 7 DIAS ATRAS
    //public static FECHA_INICIO_MAPA_VISTA_GENERAL ="2023-02-13T00:00:00";
    public static FECHA_INICIO_MAPA_VISTA_GENERAL = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format()).substring(0,19);
    //public static FECHA_INICIO_MAPA_METRICAS ="2023-02-13T00:00:00";
    public static FECHA_INICIO_MAPA_METRICAS = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format()).substring(0,19);

    //FECHA POR HORA
    //public static FECHA_INICIO_MAPA_AFECTACIONES_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_MAPA_AFECTACIONES_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    //public static FECHA_INICIO_MAPA_INALCANZABLES_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_MAPA_INALCANZABLES_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    //public static FECHA_INICIO_MAPA_METRICAS_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_MAPA_METRICAS_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    //public static FECHA_INICIO_MAPA_METRICAS_12 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_MAPA_METRICAS_12 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);

    //FECHA PRIMER DIA DEL MES ACTUAL
    public static FECHA_INICIO_MAPA_TICKET ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_MAPA_TICKET = (moment(Constantes.FECHA_HORA_ACTUAL).startOf('month').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format()).substring(0,19); */
    public static FECHA_INICIO_MAPA_ENCABEZADO ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_MAPA_ENCABEZADO = (moment(Constantes.FECHA_HORA_ACTUAL).startOf('month').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format()).substring(0,19); */


//EJECUTIVO
    //FECHA A 7 DIAS ATRAS
    //public static FECHA_INICIO_EJECUTIVO_VISTA_GENERAL ="2023-02-13T00:00:00";
    public static FECHA_INICIO_EJECUTIVO_VISTA_GENERAL = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format()).substring(0,19);
    //public static FECHA_INICIO_EJECUTIVO_METRICAS ="2023-02-13T00:00:00";
    public static FECHA_INICIO_EJECUTIVO_METRICAS = (moment(Constantes.FECHA_HORA_ACTUAL).set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format()).substring(0,19);

    //FECHA POR HORA
    //public static FECHA_INICIO_EJECUTIVO_AFECTACIONES_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_EJECUTIVO_AFECTACIONES_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);
    //public static FECHA_INICIO_EJECUTIVO_RENDIMIENTO_24 ="2023-02-13T00:00:00";
    public static FECHA_INICIO_EJECUTIVO_RENDIMIENTO_24 = (moment(Constantes.FECHA_HORA_ACTUAL).set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(23, 'hours').format()).substring(0,19);

    //FECHA PRIMER DIA DEL MES ACTUAL
    public static FECHA_INICIO_EJECUTIVO_TICKET ="2023-02-13T00:00:00";
    /* public static FECHA_INICIO_EJECUTIVO_TICKET = (moment(Constantes.FECHA_HORA_ACTUAL).startOf('month').set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0}).format()).substring(0,19); */

    public static URL_API = "https://api.ipify.org/?format=json";
}  

 