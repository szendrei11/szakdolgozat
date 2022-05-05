import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { TmdbService, TVResponse } from '../services/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class TvResolver implements Resolve<TVResponse> {
  constructor(private tmdbService: TmdbService, private route: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return of(
      this.tmdbService.getTvDetails(route.params['id']).pipe(
        catchError(() => {
          this.route.navigate(['/home']);
          return of(null);
          // return of([false]);
        })
      )
    );
  }
}
