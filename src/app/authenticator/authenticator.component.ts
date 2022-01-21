import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {
  
  state = AuthenticatorState.LOGIN;

  firebaseAuth : FirebaseTSAuth;
  
  constructor(private sheetRef: MatBottomSheetRef) {
    
    this.firebaseAuth = new FirebaseTSAuth();
   }

  ngOnInit(): void {
  }

  onLogin(){
    
    this.state = AuthenticatorState.LOGIN;
    
  }


  onForget(){
     this.state = AuthenticatorState.FOR_PASSWORD;
  }


  onCreateaccount(){
    this.state = AuthenticatorState.REGISTER;
  }



  onlogedin(){
    return this.state == AuthenticatorState.LOGIN;
  }

  onCreate(){
    return this.state == AuthenticatorState.REGISTER;
  }

  onReset(){
    return this.state == AuthenticatorState.FOR_PASSWORD;
  }


  getStateText(){
    switch(this.state){
      case AuthenticatorState.LOGIN:
        return "Login";
      case AuthenticatorState.REGISTER:
        return "Register";
      case AuthenticatorState.FOR_PASSWORD:
        return "Forgot Password";
    }
  }


  // third part

  onLoginAccount(registerEmail:HTMLInputElement , registerPassword:HTMLInputElement){
    let email = registerEmail.value;
    let password = registerPassword.value;

    if(
      this.isNotempty(email) &&
      this.isNotempty(password) 
    ){
      this.firebaseAuth.signInWith(
        {
          email : email,
          password : password,
          onComplete: (uc) =>{
            //  alert("LoggedIn Successfully");
            //  registerEmail.value = "";
            //  registerPassword.value = "";
            this.sheetRef.dismiss();
          },
          onFail: (err) => {
            alert ("Fail To LogIn");
          }
        }
      );
    }
  }


  onCreateAccount(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmedPassword: HTMLInputElement,
  ){
     let email = registerEmail.value;
     let password = registerPassword.value;
     let confirmpassword = registerConfirmedPassword.value;

     if(
       this.isNotempty(email) &&
       this.isNotempty(password) &&
       this.isNotempty(confirmpassword) &&
       this.isMatch( password ,confirmpassword)
     ){
      this.firebaseAuth.createAccountWith(
        {
          email : email,
          password : password,
          onComplete: (uc) =>{
            //  alert("crate account");
            //  registerEmail.value = "";
            //  registerPassword.value = "";
            //  registerConfirmedPassword.value = "";
            this.sheetRef.dismiss();
          },
          onFail: (err) => {
            alert ("fail to create");
          }
        }
      );
     }
     
  }


  onResetAccount(registerEmail:HTMLInputElement){
    let email = registerEmail.value;

    if(
      this.isNotempty(email) 
    ){
      this.firebaseAuth.sendPasswordResetEmail(
        {
          email : email,
          onComplete: (uc) =>{
            //  alert("Reset Successfully");
            //  registerEmail.value = "";
            this.sheetRef.dismiss();
          },
        }
      );
    }
  }


  isNotempty(text:string){
     return text != null && text.length > 0;
  }


  isMatch(text:string, comparedWith:string){
     return text == comparedWith; 
  }


}


export enum AuthenticatorState{
LOGIN,
REGISTER,
FOR_PASSWORD,
}
