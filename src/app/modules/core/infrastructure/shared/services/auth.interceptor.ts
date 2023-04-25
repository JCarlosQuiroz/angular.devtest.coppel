import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionInteractor } from '../../../domain/ports/in/session.interactor';
import { User } from '../../../domain/models/User';
import { UserInteractor } from '../../../domain/ports/in/user.interactor';
import { UserService } from '../../../domain/ports/out/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private sessionInteractor: SessionInteractor,
    private userInteractor: UserInteractor,
  ) { }

  /**
   * @description Intercepta las peticiones http y le añade el token. Si el token expiró cierra sesión
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const user: User = <User>this.sessionInteractor.get('current');
    if (user) {

      const token: string = user.token!;

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }
    }
    return next.handle(request)
      .pipe(
        map(event => {
          if (event instanceof HttpResponse) {
            if (event.body && event.body.statusCode == 401) {
              this.userInteractor.endSession();
              return;
            }
          }
          return event;
        }),
        finalize(() => {
          if (user) {
          const time_now = new Date().getTime();
          const time_startAt = new Date(user.startAt!).getTime();
          const time_expiredAt = new Date(user.expiredAt!).getTime();
            if ((time_now - time_startAt) >= (time_expiredAt - time_startAt) / 2 && time_now <= time_expiredAt) {
              this.refresh(user);
            }
          }
        })
      );
  }

  /**
   * @param user
   */
  refresh(user: User): void {
    this.userInteractor.refreshSession(user.userName, user.password);
  }

}
