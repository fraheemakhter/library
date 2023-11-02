import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import { BookModel } from './model/book-model';
import { BookApiService } from 'src/services/book-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   formValue!:FormGroup;
   bookDetailModelObj : BookModel = new BookModel();   
   bookslist!:any;
   author!:any;
   birthday!:any;
   birthPlace!:any;
   books!:any;
  years:any=[];
  showUpdate!:boolean;
  showAdd!:boolean;
  indexID:number=0;
  oldTitle!:any;
  url = './assets/images/of39.png';


constructor( private bookService:BookApiService) {} 
  addBookForm = new FormGroup({
    bookImage:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    imageUrl:new FormControl('',[Validators.required]),
    purchaseLink:new FormControl('',[Validators.required]), 
    PublishDate:new FormControl('',[Validators.required]),   
  })  
  
 /* loading Angular hooks */ 
ngOnInit():void {
  this.getBookDetails();
  this.counteryear();  
}


getControl(name:any) :AbstractControl | null {
  return this.addBookForm.get(name);
}

/* Counter for Display year List */
counteryear() { 
  for(let i:number=1950; i<2024; i++) {   
    this.years.push(i);
    }      
}

/* For Display Pop Up Model */
clickBookDetailForm() {
this.addBookForm.reset();
this.showAdd = true;
this.showUpdate = false;
}
/* For Getting List of Authors Books from API */
  getBookDetails() {
    this.bookService.getBookDetails().subscribe(res=>{
    this.bookslist  = res;
    this.author     = this.bookslist.data.author;
    this.birthday   = this.bookslist.data.birthday;
    this.birthPlace = this.bookslist.data.birthPlace;
    this.books      = this.bookslist.data.books;
    })
  }
  /* For Adding Books */
addBookDetails() {
  this.books.push(this.addBookForm.value);
   let ref = document.getElementById("close");
  ref?.click();
  this.addBookForm.reset();   
  }  
  
  /* For Sorting Via Alphabetically or Title Wise */
  sortingBooks(event:any) {
  return this.books.sort((a:any,b:any)=>a.event.target.value.localeCompare(b.event.target.value));
  }  
  

/* For Upload Image */
  onselectFile(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
      } 
    }
  }

/* Edit Pop Up View  */
onModify(bookListData:any, j:any) {
this.indexID = j;
this.showAdd = false;
this.showUpdate = true; 
    this.addBookForm.controls['imageUrl'].setValue(bookListData.imageUrl);
    this.addBookForm.controls['title'].setValue(bookListData.title);
    this.addBookForm.controls['purchaseLink'].setValue(bookListData.purchaseLink);
    this.addBookForm.controls['PublishDate'].setValue(bookListData.PublishDate);
  }

  /* Update Books Details  */
  updateBookDetails() {
    this.oldTitle = this.books[this.indexID].title;    
    this.showAdd = false;
    this.showUpdate = true;
    this.books.splice(this.indexID, 1, this.addBookForm.value);
    this.books.push(this.addBookForm.value);
    let ref = document.getElementById("close");
    ref?.click();
    this.addBookForm.reset();  
  }
  /* Delete Books  */
  deleteBook(title:string) {
    if (confirm("Are you sure to delete record!") == true) {
      let filters = this.books.filter((a:any, i:any) => {
        if(title == a.title) {
          this.books.splice(i,1)
        }
      })
    } else {
      console.log("cancelled");
    }

   
  }
}
