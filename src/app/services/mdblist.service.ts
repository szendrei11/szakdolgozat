import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

export interface mdblistResponse {
  title?: string;
  year?: number;
  released?: Date;
  description?: string;
  runtime?: number;
  score?: number;
  imdbid?: string;
  traktid?: number;
  tmdbid?: number;
  type?: string;
  ratings?: Ratings[];
  language?: string;
  country?: string;
  response: string;
}
export interface Ratings {
  source: string;
  value: number;
  score: number;
  votes: number;
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class MdblistService {
  private APIKEY = 'lrzvgf7ryyvcxbqujtp4ihixx';
  private baseUrl = 'https://mdblist.com/api/?apikey=';
  constructor(private http: HttpClient, handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getDataByTmdbId(
    tmdbId: any,
    media_type?: string
  ): Observable<mdblistResponse> {
    let headers = new HttpHeaders({
      'X-RapidAPI-Host': 'mdblist.p.rapidapi.com',
      'X-RapidAPI-Key': '2cf320542emsh6a9e3733d9dc7e3p1bdc63jsn33167e07c43e',
    });
    if (media_type == 'tv') {
      return this.http.get<any>(
        'https://mdblist.p.rapidapi.com/?tm=' + tmdbId + '&m=show',
        { headers: headers }
      );
    }
    return this.http.get<any>('https://mdblist.p.rapidapi.com/?tm=' + tmdbId, {
      headers: headers,
    });
  }
}
