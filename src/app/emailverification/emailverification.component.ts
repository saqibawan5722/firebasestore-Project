import { Component, OnInit } from '@angular/core';
// import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss']
})
export class EmailverificationComponent implements OnInit {
 auth = new FirebaseTSAuth();
  constructor( private router : Router) { }

  ngOnInit(): void {
    if( 
      this.auth.isSignedIn() &&
      !this.auth.getAuth().currentUser?.emailVerified)
      {
        this.auth.sendVerificationEmail();
      } else{
        this.router.navigate([""]);
      }
    

  }


  onResendClick(){
    this.auth.sendVerificationEmail();
  }
}
