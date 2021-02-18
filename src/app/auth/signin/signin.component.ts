import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  // méthode réactive étape 1 : on crée le formgroup
  signInForm:FormGroup;
  // message d'erreur si la création du user pose problème
  errorMessage:string;

  // méthode réactive étape 2 : import du formbuilder
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // méthode réactive étape 3 : méthode d'initialisation du formulaire et appel de celle ci dans ngOnInit
  initForm():void {
    // définition des champs du formulaire avec le formbuilder
    // pour le password on définit un pattern alphanumérique de 6 caractères minimum
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit():void {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        console.log('user connecté')
        this.router.navigate(['/books']);
      }, 
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
