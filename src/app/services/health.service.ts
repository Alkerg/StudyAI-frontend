import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, map, of, switchMap, timeout, timer } from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class HealthService{
    private http = inject(HttpClient);
    private intervalInHours = 12
    readonly isOnline = signal(true);
    //readonly lastCheck = signal<Date | null>(null);

    constructor(){
        timer(0, this.intervalInHours*3600000000).pipe(
            switchMap(() => this.http.get(`${environment.apiUrl}/api/Health`, { responseType: 'text' }).pipe(
                timeout(5000),
                map(() => true),
                catchError(() => of(false))
            )),
            takeUntilDestroyed()
        ).subscribe((ok) => {
            this.isOnline.set(ok);
            //this.lastCheck.set(new Date());
        })
    }

}