import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  getErrors = '';
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router){}

  regExpPassword = "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";
  
  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required], [this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.regExpPassword )]]
  })

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error => this.getErrors = error.errors     
    })
  }

  validateEmailNotTaken() : AsyncValidatorFn
  {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe( 
        debounceTime(1000), // reduce requests to server by using deboundtime
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailexists: true} : null),
            finalize(() => control.markAsTouched)
          )
        })
      )
    }
  }
}
