export class Educacion {
    id?: number;
    titulo: string;
    tipoeducacion:string;
    institucion:string ;
    icono: string ;
    inicio: string ;
    fin: string ; 
    cursando:boolean; 

    constructor(titulo:string , tipoeducacion:string, institucion:string,  icono:string,  inicio:string, fin:string,cursando:boolean) {
        this.titulo = titulo;
        this.tipoeducacion = tipoeducacion;
        this.institucion = institucion;
        this.icono = icono;
        this.inicio = inicio;
        this.fin = fin;
        this.cursando= cursando;
    }
}
