import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const newReq = req.clone({
      params: (req.params ? req.params : new HttpParams())
                 .set('apiKey', environment.apiKey)  
    });

    return next.handle(newReq);
  }
}