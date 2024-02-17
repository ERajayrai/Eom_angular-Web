import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
  hidePassword=true;

  constructor(private fb:FormBuilder,private snakbar:MatSnackBar,private authService:AuthService,private router:Router){

  }

  ngOnInit():void{
    this.loginForm=this.fb.group({
      email:[null,Validators.required,Validators.email],
      password:[null,Validators.required],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }

  onSubmit():void{
    const password=this.loginForm.get('password')?.value;
    const uaerName=this.loginForm.get("email")?.value;

    // if(password!=confirmPassword){
    //   this.snakbar.open('password do not match','close',{duration:5000,panelClass:'error-snackbar'});
    //   return ;
    // }

    this.authService.login(uaerName,password).subscribe(
      (req)=>{
        this.snakbar.open('login succesfully','close',{duration:5000})
      },
      (error)=>{
        console.log(error)
        this.snakbar.open(error,'close',{duration:5000,panelClass:'error-snackbar'})
      }
    )
  }

}
