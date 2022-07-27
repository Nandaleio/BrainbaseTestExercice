import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap({
                next: () => null,
                error: (error: HttpErrorResponse) => {
                    this.dialog.open(DialogDataExampleDialog, {
                        data: error
                    })
                }
            }
            )
        );
    }
}

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: './dialogError.html',
})
export class DialogDataExampleDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: HttpErrorResponse) { }
}