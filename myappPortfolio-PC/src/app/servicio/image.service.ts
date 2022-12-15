import { Injectable } from '@angular/core';
import { Storage,ref, uploadBytes, list, getDownloadURL,deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string[]=[];
  i:number=0;
  completed:string[]=["false"];
  urlActual:string="";
  constructor(private storage:Storage) { }

  public uploadImage($event:any,name:string,bandera:number){
    const file=$event.target.files[0];
    
   if(bandera==0)//habilidades
   { 
    const imgRef= ref(this.storage,`imagen/Skill/`+ file.name);
   uploadBytes(imgRef,file)
   .then(response=>{this.getImages(0,file)
    
  })
   .catch(error=> console.log(error))
  }
  if(bandera==1)//certificados
  { 
    const imgRef= ref(this.storage,`imagen/Certificado/`+ file.name);
    uploadBytes(imgRef,file)
    .then(response=>{this.getImages(1,file)})
    .catch(error=> console.log(error))
  }
  if(bandera==2)//pérfil
  {
    const imgRef= ref(this.storage,`imagen/Perfil/`+ file.name);
    uploadBytes(imgRef,file)
    .then(response=>{this.getImages(2,file);
      })
    .catch(error=> console.log(error))
  }
  if(bandera==3)//proyecto
  {
    const imgRef= ref(this.storage,`imagen/Proyecto/`+ file.name);
    uploadBytes(imgRef,file)
    .then(response=>{this.getImages(3,file);
       })
    .catch(error=> console.log(error))
  }
  if(bandera==4)//estudio
  {console.log("pasa a bandera 4")
    const imgRef= ref(this.storage,`imagen/Estudio/`+ file.name);
    uploadBytes(imgRef,file)
    .then(response=>{this.getImages(4,file);
       })
    .catch(error=> console.log(error))
  }
  }
  getImages(band:number,file:any){
    
    if(band==0)
    {const imagesRef=ref(this.storage,'imagen/Skill/');
    list(imagesRef)
    .then(async response=>{
      for(let item of response.items){
        if(file.name==item.name){
          this.url.push(await getDownloadURL(item));
         // this.completed.push(true);
        }
      } 
    })
    .catch(error=> console.log(error))
  }
  if(band==1)
    {const imagesRef=ref(this.storage,'imagen/Certificado/');
    list(imagesRef)
    .then(async response=>{
      for(let item of response.items){
           
        this.url.push(await getDownloadURL(item));
        
      }
      
    })
    .catch(error=> console.log(error))
  }
  
 if(band==2)
    {const imagesRef=ref(this.storage,'imagen/Perfil/');
    
    list(imagesRef)
    
    .then(async response=>{
      for(let item of response.items){
    
        if(file.name==item.name){
          this.url.push(await getDownloadURL(item));
         
        }
      }
    })
    .catch(error=> console.log(error))
  } 

  if(band==3)
  {const imagesRef=ref(this.storage,'imagen/Proyecto/');
  
  list(imagesRef)
  
  .then(async response=>{
    for(let item of response.items){
  
      if(file.name==item.name){
        this.url.push(await getDownloadURL(item));
       
      }
    }
  })
  .catch(error=> console.log(error))
} 
if(band==4)
{console.log("entra a getimages editar estudio")
  const imagesRef=ref(this.storage,'imagen/Estudio/');
list(imagesRef)
.then(async response=>{
  for(let item of response.items){
    if(file.name==item.name){
      this.url.push(await getDownloadURL(item));
      this.completed.push("true");
     
    }
  } 
})
.catch(error=> console.log(error))
}} 

public uploadImageEdit($event:any,bandera:number,urlal:string){
  const file=$event.target.files[0];
  this.urlActual=urlal;
 if(bandera==0)//habilidades
 { 
  const imgRef= ref(this.storage,`imagen/Skill/`+ file.name);
 uploadBytes(imgRef,file)
 .then(response=>{this.getImages(0,file)
  
})
 .catch(error=> console.log(error))
}
if(bandera==1)//certificados
{ 
  const imgRef= ref(this.storage,`imagen/Certificado/`+ file.name);
  uploadBytes(imgRef,file)
  .then(response=>{this.getImages(1,file)})
  .catch(error=> console.log(error))
}
if(bandera==2)//pérfil
{
  const imgRef= ref(this.storage,`imagen/Perfil/`+ file.name);
  uploadBytes(imgRef,file)
  .then(response=>{this.getImages(2,file);
    })
  .catch(error=> console.log(error))
}
if(bandera==3)//proyecto
{
  const imgRef= ref(this.storage,`imagen/Proyecto/`+ file.name);
  uploadBytes(imgRef,file)
  .then(response=>{this.getImages(3,file);
     })
  .catch(error=> console.log(error))
}
if(bandera==4)//estudio
{console.log("si entra a editar imagen")
 // const filePath = file.name;
   // this.imageService.uploadImage($event,filePath,1);
    //const fileRef= ref(this.storage,`imagen/Certificado/`+ filePath);
    //  const fileRef= ref(this.storage,`imagen/Skill/`+ filePath);
    const imagesRef=ref(this.storage,'imagen/Estudio/');
    
    list(imagesRef)
    
    .then(async response=>{
      
      for(let item of response.items){
       const path= await getDownloadURL(item);
   
        if(this.urlActual==path){
         
          //  this.url=await getDownloadURL(item);
          console.log("imagen igual a url actual")
            const fileRef= ref(this.storage,`imagen/Estudio/`+ file.name);
            
            //  const fileRef= ref(this.storage,`imagen/Skill/`+ filePath);
                uploadBytes(fileRef,file.name)
              .then(response=>{this.getImages(4,file);
                this.completed.push("true");})
              .catch(error=> console.log(error))

              deleteObject(item).then(() => {
                console.log("la imagen se elimino");
              }).catch((error) => {
                 console.log("ocurrio un error: ", error);
              });        
          }
      }  
    })
    .catch(error=> console.log(error))
       
      .then(response=>{
        })
      .catch(error=> console.log(error))
   
 
   // }
  }
}
}
