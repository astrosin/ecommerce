import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions;
  login_message:string;
  admin_token;
  data;
  auth_boolean:Boolean;
  userlist:any;
  number_user:any={"Response":10};
  number_product:any={"Response":10};
  number_transactions:any={"Response":10};
  allproduct:any;
  currentUserValue=false;
  createproduct:any;
  updateproduct:any;
  deleteproduct:any;
  alltransaction:any;

  constructor(public router:Router,private storage: Storage,private http: HttpClient) { }

  login(user: any) {
    if(user.email=="gowthamraguvaran@gmail.com" && user.password=="gowthamvdm"){

      // this.storage.set(TOKEN_KEY,"d026974be5f64942d676696f3336fcac14fa713d").then(() => {
      //   console.log("token stored successfully")
      // });
      
      this.login_message="successfully login into application"
      this.auth_boolean=true
    }else{
      this.login_message="cannot able to login"
      this.auth_boolean=false
    }
  }
  logout(){
    // return this.storage.remove(TOKEN_KEY).then(() => {
    //   console.log("token deleted successfully")
    //   this.auth_boolean=false
    // });
  }
  numberOfUsers(): Observable<any>{
    return this.http.get("http://127.0.0.1:8000/authentication/get/all_user");
  }
  numberOfProducts(): Observable<any>{
    return this.http.get("http://127.0.0.1:8000/authentication/admin/orderitem/get");
  }
  numberOfTransactions(): Observable<any>{
    return this.http.get("http://127.0.0.1:8000/authentication/user/ordered/item/get");
  }
  findAllUsers(): Observable<any> {
  //  this.storage.get(TOKEN_KEY).then(res => {
  //     if (res) {
        
  //       this.httpOptions = {
  //         headers: new HttpHeaders({
  //             'Authorization': 'token ' + res
  //         })
  //       };
  //       return this.http.get("http://127.0.0.1:8000/authentication/get/all_user");
  //     }
  //   })
    return this.http.get("http://127.0.0.1:8000/authentication/get/all_user");
  }
  findAllProducts(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/authentication/admin/orderitem/get");
  }
  createProduct(product: any): Observable<any> {
    const uploadData = new FormData(); // declar form object
    uploadData.append('item_name',product.item_name);
    uploadData.append('img_file', product.img_file);
    uploadData.append('price', product.price);
    uploadData.append('explanation', product.explanation);
     return this.http.post("http://127.0.0.1:8000/authentication/admin/orderitem/post",product);
  }

  updateProduct(product: any): Observable<any> {
     return this.updateproduct
  }

  deleteProduct(product: any): Observable<any> {
     return this.deleteproduct
  }
  //transactions
  findAllTransactions(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/authentication/user/ordered/item/get");
  }
}
