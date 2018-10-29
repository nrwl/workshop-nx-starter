import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BackendUserIdService } from './backend-user-id.service';

@Injectable()
export class LoggedInUserInterceptor implements HttpInterceptor {
  constructor(private backendUserIdService: BackendUserIdService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId = this.backendUserIdService.userId;
    if (userId) {
      request = request.clone({
        setHeaders: {
          userid: `${userId}`
        }
      });
    }
    return next.handle(request);
  }
}
