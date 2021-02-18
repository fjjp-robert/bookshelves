import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

// Définition des routes
const appRoutes:Routes = [
  { path: 'auth/sign-in', component: SigninComponent },
  { path: 'auth/sign-up', component: SignupComponent },
  { path: 'books', canActivate: [AuthGuard], component: BookListComponent },
  { path: 'books/view/:id', canActivate: [AuthGuard], component: SingleBookComponent },
  { path: 'books/new', canActivate: [AuthGuard], component: BookFormComponent },
  // redirection auto si le chemin est la racine. /!\ il faut spécifier le pathMatch si c'est la route vide pour un redirect
  { path: '', redirectTo: 'books', pathMatch: 'full'},
  { path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
