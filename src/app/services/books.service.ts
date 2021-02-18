import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import firebase from 'firebase';
import { rejects } from 'assert';

@Injectable()
export class BooksService {

  private static noeudBooks = '/books';

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks(): void {
    this.booksSubject.next(this.books);
  }

  saveBooks(): void {
    // sauvegarde du tableau books dans le noeud books de la base de données 
    // (connexion directe contrairement à 
    // l'autre projet où l'on appelait des requêtes http)
    firebase.database().ref(BooksService.noeudBooks).set(this.books);
  }

  getBooks(): void {
    // récupération en fonction de l'évenement 'value'
    firebase.database().ref(BooksService.noeudBooks)
      .on('value',
        (data) => {
          this.books = (data && data.val()) ? data.val() : [];
          this.emitBooks();
        });
  }

  getBookById(id: number): Promise<Book> {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(BooksService.noeudBooks + '/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(book: Book): void {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  deleteBook(bookToRemove: Book): void {
    if (bookToRemove.photo) {
      const storageRef = firebase.storage().refFromURL(bookToRemove.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !')
        }
      ).catch(
        (error) => {
          console.log('Erreur à la suppression ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (book) => {
        return book === bookToRemove;
      }
    );
    // on supprime 1 élément à partir de l'index trouvé
    this.books.splice(bookIndexToRemove, 1)
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const refFileToBeUpdated = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name);
        const upload = refFileToBeUpdated.put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log('chargement...');
          }, 
          (error) => {
            console.log('erreur au chargement ' + error);
            reject(error);
          },
          () => {
            console.log('fini !');
            resolve(refFileToBeUpdated.getDownloadURL());
          }
        );
      }
    )
  }

}
