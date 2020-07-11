import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    const requestClone = req.clone({
      headers
    });
    return next.handle(requestClone)
      .pipe(
        catchError(this.handlingError)
      );

  }

  handlingError(error: HttpErrorResponse) {
    let errorResponse = error;
    console.log(errorResponse.status);
    console.warn(errorResponse);
    console.log(errorResponse.message);

    if (errorResponse.status >= 500) {
      this.router.navigate(['internal-server-error']);
      return throwError('internal server error');
    }
/*     if (errorResponse.status == 401) {
      Swal.fire({
        type: 'info',
        title: 'Oops...',
        text: 'Sesión expirada',
      });
      return throwError('No authorization');
    } */

    

    if (errorResponse.status >= 400 && errorResponse.status <= 404  ) {
      errorResponse = error.error;

      // Cuando descargamos un archivo y tenemos un error, lo recibimos en tipo blob a si que los convirtimos en json
      if (errorResponse instanceof Blob) {
        const reader = new FileReader();
        reader.readAsText(errorResponse);
        reader.onload = (e) => {
          const result: any = reader.result;
          errorResponse = JSON.parse(result);
          /* Swal.fire({
            type: 'info',
            title: 'Oops...',
            text: errorResponse.message,
          }); */
        };
      } else {
       /*  Swal.fire({
          type: 'info',
          title: 'Oops...',
          text: errorResponse.message,
        }); */
      }
    }
    return throwError(errorResponse);
  }

}
