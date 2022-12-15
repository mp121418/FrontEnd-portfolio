import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Agregar:string=""
  constructor() { }

  ngOnInit(): void {
  }
  evento(){
    this.Agregar="agregar"
    
    }
    
    quitar(){
      
      this.Agregar="quitar"
     
      }
      editar(){
        this.Agregar="editar"
        
      }
}
