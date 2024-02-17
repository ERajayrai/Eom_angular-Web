import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from './storage/user-storage.service';
const BASIC_URL='http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private hhtp:HttpClient,private userStorage:UserStorageService) { }

  ragister(requestData:any):Observable<any>{
    return this.hhtp.post(BASIC_URL+'sign-up',requestData);
  }

  login(username:string,password:string):any{
    const headers= new HttpHeaders().set('Content-type','application/json');
    const body={username,password};

    return this.hhtp.post(BASIC_URL+'auth',body,{headers, observe: "response", responseType: "json"}).pipe(
      map((res)=>{
        console.log(res.headers.get('authoriazation'))
        console.log(res)
        const token=res.headers.get('authoriazation')?.substring(7)
        const user=res.body
        if(user && token){
          this.userStorage.saveToken(token);
          this.userStorage.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }
}
