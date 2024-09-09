import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router : Router) { 
    const user = localStorage.getItem('user');
    if(user) this.currentUserSource.next(JSON.parse(user)); // ensure that when we refresh the website, currentUserSource will be set again
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http.get<User>(this.baseUrl + 'accounts', {headers}).pipe(
      map(user => {
        localStorage.setItem('token', user.token),
        localStorage.setItem('user', JSON.stringify(user)),
        this.currentUserSource.next(user)
      })
    )
  }
  
  login(values: any) {
    return this.http.post<User>(this.baseUrl + 'Accounts/login', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token),
        localStorage.setItem('user', JSON.stringify(user)),
        this.currentUserSource.next(user)
      })
    )
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + 'Accounts/register', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token),
        localStorage.setItem('user', JSON.stringify(user)),
        this.currentUserSource.next(user)
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string)
  {
    return this.http.get<boolean>(this.baseUrl + 'Accounts/emailexists?email=' + email);
  }

  getUserAddress(){
    return this.http.get<Address>(this.baseUrl + 'Accounts/Address');
  }

  updateUserAddress(address : Address){
    return this.http.put(this.baseUrl + 'Accounts/Address', address);
  }

}
