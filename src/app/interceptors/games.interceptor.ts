import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GamesInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //devo clonare le request perchè è immutabile
    request = request.clone({
      setHeaders: {
        'X-RapidAPI-Host' : XXXXXX,
        'x-rapidapi-key': XXXXXX
      },
      setParams: {
        'key': XXXXXXXXX,
      }
    })
    return next.handle(request);
  }
}
