import { Component } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudnew';
  auth = new FirebaseTSAuth();
  userHasprofile = true;
  userDocument : userDocument;
  //isLoggedin = false;
  firestore = new FirebaseTSFirestore();

  constructor(private sheet: MatBottomSheet, private router: Router ){
    
     this.auth.listenToSignInStateChanges(
       user => {
         this.auth.checkSignInState({
           whenSignedIn : user=>{
            //  alert("logged in");
            // this.isLoggedin = true;
           },
           whenSignedOut : user =>{
            //  alert("logged out")
           },
           whenSignedInAndEmailNotVerified : user =>{

             this.router.navigateByUrl('emailverfication');
           },
           whenSignedInAndEmailVerified : user => {
             this.getUserProfile();
           },
           whenChanged : user =>{

           }
         })
       }
     );
  }
  

  getUserProfile(){
      this.firestore.listenToDocument(
      {
      name : "Get Document",
      path : ["Users", this.auth.getAuth().currentUser.uid],
      onUpdate: (result) => {
          this.userDocument = <userDocument>result.data();
          this.userHasprofile = result.exists;
          if(this.userHasprofile){
            this.router.navigateByUrl('postfeed');
          }
      }
    })
  }

  onLogoutClick(){
    return this.auth.signOut();
  }


  LoggedIn(){
    return this.auth.isSignedIn();
  }

  onLoginClick(){
    this.sheet.open(AuthenticatorComponent);
  }
  

}



export interface userDocument{
  publicName : string;
  description : string;
}
