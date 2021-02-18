import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {


  // méthode réactive étape 1 : on crée le formgroup
  bookForm:FormGroup;
  fileIsUploading:boolean = false;
  fileUrl:string;
  fileUploaded:boolean = false;

  // message d'erreur si la création du user pose problème
  errorMessage:string;

  constructor(private formBuilder:FormBuilder, private booksService:BooksService, private router:Router) { }

  ngOnInit(): void {
    

   this.initForm();
  }

  // méthode réactive étape 3 : méthode d'initialisation du formulaire et appel de celle ci dans ngOnInit
  initForm():void {
    // définition des champs du formulaire avec le formbuilder
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      photo: ['']
    });
  }


  onSaveBook():void {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const book = new Book(title, author);
    if (this.fileUrl && this.fileUrl !== '') {
      book.photo = this.fileUrl;
    }

    this.booksService.createNewBook(book);
    this.router.navigate(['/books']);
  }

  onUploadFile(file:File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url:string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
