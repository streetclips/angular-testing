import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { finalize, Observable } from 'rxjs'
import { LoaderService } from '../services/loader.service'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  requestCounter = 0;

  constructor(
    private loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('X-Loader') === 'false') {
      return next.handle(request);
    }

    this.loaderService.show();
    this.requestCounter++;

    return next.handle(request).pipe(
      finalize(() => {
        this.requestCounter--;
        if (this.requestCounter === 0) {
          this.loaderService.hide();
        }
      }),
    );
  }
}
