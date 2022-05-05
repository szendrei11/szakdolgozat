import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, of, retry } from 'rxjs';

export interface ExternalIds {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}
export interface OmdbResponse {
  Title?: string;
  Year?: number;
  Rated?: string;
  Released?: Date;
  Runtime?: string;
  Genre?: string[];
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Conuntry?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Rating[] | [];
  Metascore?: number;
  imdbRating?: number;
  imdbVotes?: number;
  imdbID?: string;
  Type?: string;
  Dvd?: Date;
  Boxoffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string;
}
export interface Rating {
  Source: string;
  Value: number;
}

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private APIKEY = '&apikey=1396ff7f';
  private baseUrl = 'https://www.omdbapi.com/';
  private byId = '?i=';
  private byTitle = '?t=';
  private andYear = '&y=';

  private fullPlot = '&plot=full';

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  getDataById(imdbId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.byId + imdbId + this.APIKEY);
  }
  getDataByTitle(title: string): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + this.byTitle + title + this.APIKEY + this.fullPlot
    );
  }
  getDataByTitleYear(title: string, year: string): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        this.byTitle +
        title +
        this.andYear +
        year +
        this.APIKEY +
        this.fullPlot
    );
  }
}
