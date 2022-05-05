import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, map, EMPTY, filter, Observable, of } from 'rxjs';
import {
  SearchResponse,
  TmdbResponse,
  TmdbService,
} from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute
  ) {}
  tmdbSearchResults$!: Observable<any>;
  ngOnInit(): void {
    this.getSearch(this.route.snapshot.paramMap.get('name'));
  }

  getSearch(query: any) {
    this.tmdbSearchResults$ = this.tmdbService.getSearched(query);
  }
}
