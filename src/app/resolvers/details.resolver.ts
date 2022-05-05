import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { MdblistService } from '../services/mdblist.service';
import { OmdbService } from '../services/omdb.service';
import { MovieDetails, TmdbService } from '../services/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsResolver implements Resolve<MovieDetails> {
  constructor(
    private tmdbService: TmdbService,
    private omdbService: OmdbService,
    private mdblistService: MdblistService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return of(
      this.tmdbService.getDetails(route.params['id'], route.url[0].path).pipe(
        catchError(() => {
          this.router.navigate(['/home']);
          return of(null);
          // return of([false]);
        })
      )
    );
    /*
    return forkJoin([
      this.tmdbService.getDetails(route.params['id'], route.url[0].path),
      this.mdblistService.getDataByTmdbId(
        route.params['id'],
        route.url[0].path
      ),
    ]).pipe(
      map((result: any) => {
        return {
          details: result[0],
          ratings: result[1],
        };
      })
    );*/
  }
}
