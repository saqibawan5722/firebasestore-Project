import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// firebase
import { FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';

// component
import { HomeComponent } from './home/home.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component'


//material
import { MatButtonModule} from '@angular/material/button';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatCardModule} from '@angular/material/Card';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostComponent } from './post/post.component'

 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    EmailverificationComponent,
    ProfileComponent,
    PostfeedComponent,
    CreatepostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //material
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig)
  }
}
