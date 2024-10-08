import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService : BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(
      request.url.includes('emailexists') ||
      request.method === 'POST' && request.url.includes('Orders') ||
      request.method === 'DELETE'
    )
    {
      return next.handle(request);
    }
    this.busyService.busy();

    return next.handle(request).pipe(
      delay(500),
      finalize(() => this.busyService.idle())
    );
  }
}
