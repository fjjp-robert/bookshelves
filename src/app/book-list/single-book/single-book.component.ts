import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book:Book;

  constructor(private booksService:BooksService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // init du book vide avant chargement venant de la base
    this.book = new Book('', '');
    const bookId = this.route.snapshot.params['id'];

    // le + sert à cast le param en number
    this.booksService.getBookById(+bookId).then(
      (book) => {
        this.book = book;
      }, 
      (error) => {
        console.log('impossible de récupérer le livre en base')
      }
    );
  }

  onReturn() {
    this.router.navigate(['/books']);
  }

}
