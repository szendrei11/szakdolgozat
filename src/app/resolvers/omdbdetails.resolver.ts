import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { mdblistResponse, MdblistService } from '../services/mdblist.service';
import { OmdbResponse, OmdbService } from '../services/omdb.service';
import { TmdbService } from '../services/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class OmdbDetailsResolver implements Resolve<mdblistResponse> {
  constructor(
    private omdbService: OmdbService,
    private tmdbService: TmdbService,
    private mdblistService: MdblistService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    /*return this.tmdbService
      .getDetails(route.params['id'], route.url[0].path)
      .pipe(
        map((data) => {
          return this.omdbService.getDataById(data.external_ids.imdb_id);
        })
      );*/

    return of(
      this.mdblistService.getDataByTmdbId(route.params['id'], route.url[0].path)
    );
  }
}
