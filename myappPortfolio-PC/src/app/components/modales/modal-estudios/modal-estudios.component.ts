import { Component, OnInit,Input } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicio/educacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { ImageService } from 'src/app/servicio/image.service';

@Component({
  selector: 'app-modal-estudios',
  templateUrl: './modal-estudios.component.html',
  styleUrls: ['./modal-estudios.component.css']
})
export class ModalEstudiosComponent implements OnInit {
  opcionSeleccionado: string  = '0';
  verSeleccion: string = '';
  educacion: Educacion[]=[];
  titulo: string="";
  edu:Educacion|any=null;
  tipoeducacion:string="";
  institucion:string="";
  cursando: boolean=false;
  icono:string="";
  inicio:string="";
  fin:string="";
 datos:string[]=[];
 form: FormGroup|any=null;
 AvisarFecha:boolean=false;
 AvisarCheck:boolean=false;
 completed:boolean=false;
urlActual:string="";
  @Input() mje:string="";

  constructor(private educacionS:EducacionService, private activatedRouter:ActivatedRoute,
    private router:Router,private formBuilder:FormBuilder,private imageService:ImageService) { 
     
      this.datos = ['Formal','Informal-curso','Informal-bootcamp'];
      this.form=this.formBuilder.group({
        institucion:['',[Validators.required, Validators.minLength(3),Validators.maxLength(25)]],
        icono:[''],
        inicio:['',[Validators.required,/* Validators.pattern('(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/[0-9]{4}'),*/Validators.maxLength(10)]],
        fin:['',[Validators.minLength(3),Validators.maxLength(10)]],
        titulo:['',[Validators.required, Validators.minLength(3),Validators.maxLength(25)]],
        tipoeducacion:[''],
        cursando:['']
      })
    }

  ngOnInit(): void {
    this.cargarEducacion();
  }
  get Institucion(){
    return this.form.get("institucion");
  }
  get Inicio(){
    return this.form.get("inicio");
  }
  get InstitucionValid(){
    return this.Institucion.touched && !this.Institucion.valid;
  }

  get FinValid(){
    return this.Inicio.touched && !this.Inicio.valid;
  }
  get Fin(){
   // const fechauno = this.inicio.replace('/', ' ') // Importante reemplazarlo por un espacio
    
  //  const fechauno= new Date('01 01 2022') // Funciona
   // const fechados = new Date(this.fin.replace('/', ' '))
    //console.log(fechauno)
    
  /*  if (fechauno.getTime() > fechados.getTime()){
      this.Fin.errors;
      return true;
    } else {
      return this.form.get("fin");
    }*/
    return this.form.get("fin");
  }
  get InicioValid(){
    return this.Inicio.touched && !this.Inicio.valid;
  }
  get Titulo(){
    return this.form.get("titulo");
  }
  get TituloValid(){
    return this.Titulo.touched && !this.Titulo.valid;
  }
  get TipoEducacion(){
    return this.form.get("tipoeducacion");
  }
  get TipoEducacionValid(){
    return this.TipoEducacion.touched && !this.TipoEducacion.valid;
  }
 
 
  cargarDetalle(id?:number){
    if(id != undefined){
    this.educacionS.detail(id).subscribe(data=>{
      this.edu=data;
      this.urlActual=this.edu.icono;
    },err=>{
      alert("error al modificar");
    })
  }
}
  cargarEducacion():void{
    this.educacionS.lista().subscribe(data =>{this.educacion= data; })
   
  }
  borrar(id?:number){
    if(id != undefined){
      this.educacionS.delete(id).subscribe(data =>{
        this.cargarEducacion();
        alert("se pudo eliminar satisfactoriamente");
        this.cargarEducacion();
      },err =>{
        alert("No se pudo eliminar");
      })
    }
  }

  OnCreate():void{
  
    this.icono=this.imageService.url[this.imageService.url.length-1];
    const expe= new Educacion(this.titulo,this.tipoeducacion,this.institucion,this.icono,this.inicio,this.fin,this.cursando);
    this.educacionS.save(expe).subscribe(data=>{
      alert("Estudio añadido");
      
    },err=>{
      alert("Fallo al añadir");
    })
    
  }
  OnUpdate(id?:number):void{
  // this.ids!=id;
   // const id=this.activatedRouter.snapshot.params['id'];
   this.edu.icono=this.imageService.url[this.imageService.url.length-1];
    if(id != undefined){
       this.educacionS.update(id,this.edu).subscribe(data=>{
        alert("Estudio modificado"); 
        this.cargarEducacion();
    },err =>{
      alert("Error al modificar Educacion");
      
    })
  }
}
uploadImage($event:any){
    

  this.imageService.uploadImage($event,"nada",4);
//  this.completed= this.imageService.completed[ this.imageService.completed.length-1];
if(this.imageService.completed[this.imageService.completed.length-1]=="true")
{this.completed= true;
} 

}
uploadImageEdit($event:any){
  const file=$event.target.files[0];
  this.imageService.uploadImageEdit($event,4,this.urlActual);
  if(this.imageService.completed[this.imageService.completed.length-1]=="true")
  {
    this.completed= true;
  } 
}
onEnviar(event:Event){
  event.preventDefault;
  if(this.form.valid){
  
    this.OnCreate();

  }else{
    this.form.markAllAsTouched(); 
  }
}
capturar() {
this.tipoeducacion=this.form.get('tipoeducacion').value;
 
}
avisar(s:string){
 if(s=="check")
 {
  this.AvisarFecha=false;
 
  console.log(this.AvisarFecha)
}else{
  this.AvisarCheck=false;
  console.log(this.AvisarCheck)
}
}
Limpiar():void{
  this.form.reset();
  }

}
