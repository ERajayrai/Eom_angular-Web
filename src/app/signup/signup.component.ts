import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup; 
  hidePassword=true;

  constructor(private fb:FormBuilder,private snakbar:MatSnackBar,private authService:AuthService,private router:Router){

  }

  ngOnInit():void{
    this.signupForm=this.fb.group({
      name:[null,Validators.required],
      email:[null,Validators.required,Validators.email],
      password:[null,Validators.required],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }

  onSubmit():void{
    // const password=this.signupForm.get('password')?.value;
    // const confirmPassword=this.signupForm.get("confirmPassword")?.value;

    // if(password!=confirmPassword){
    //   this.snakbar.open('password do not match','close',{duration:5000,panelClass:'error-snackbar'});
    //   return ;
    // }

    this.authService.ragister(this.signupForm.value).subscribe(
      (req)=>{
        this.snakbar.open('signup succesfully','close',{duration:5000})
        this.router.navigateByUrl("/login");
      },
      (error)=>{
        console.log(error)
        this.snakbar.open(error,'close',{duration:5000,panelClass:'error-snackbar'})
      }
    )
  }
}
