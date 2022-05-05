import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TmdbResponse, TmdbService } from '../services/tmdb.service';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<TmdbResponse> {
  constructor(private tmdbService: TmdbService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TmdbResponse> | Promise<TmdbResponse> | TmdbResponse {
    return this.tmdbService.movies(1);
  }
}
