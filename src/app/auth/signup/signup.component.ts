import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // méthode réactive étape 1 : on crée le formgroup
  signUpForm:FormGroup;
  // message d'erreur si la création du user pose problème
  errorMessage:string;

  // méthode réactive étape 2 : import du formbuilder
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // méthode réactive étape 3 : méthode d'initialisation du formulaire et appel de celle ci dans ngOnInit
  initForm():void {
    // définition des champs du formulaire avec le formbuilder
    // pour le password on définit un pattern alphanumérique de 6 caractères minimum
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  // méthode réactive étape 4 : création du onSubmit, puis création du template correspondant

  onSubmit():void {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    this.authService.createNewUser(email, password).then(
      () => {
        console.log('user créé')
        this.router.navigate(['/books']);
      }, 
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
