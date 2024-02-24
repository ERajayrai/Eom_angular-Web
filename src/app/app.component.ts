import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { UserStorageService } from './service/auth/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommersWeb';

  isCcustomer:boolean=UserStorageService.isCustmrLoggedIn();
  isAdmin:boolean=UserStorageService.isAdminLoggedIn();

  constructor(private router:Router){}
  ngOnInit():void{
    this.router.events.subscribe(e=>{
      this.isCcustomer=UserStorageService.isCustmrLoggedIn();
     this.isAdmin=UserStorageService.isAdminLoggedIn();
    })

    
  }
  logOut(){
    UserStorageService.signOut();
    this.router.navigateByUrl['login'];
  }
}
