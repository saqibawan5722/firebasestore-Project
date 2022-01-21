import { Component, OnInit } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../authenticator/authenticator.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sheet: MatBottomSheet) { }

  ngOnInit(): void {
  }


  onGetStartedClick(){
    this.sheet.open(AuthenticatorComponent);
  }

}
