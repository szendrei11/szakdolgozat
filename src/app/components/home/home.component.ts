import { Component, OnInit } from '@angular/core';
import { Movie, TmdbService, TVResponse } from 'src/app/services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: '/app/services/tmdb.service',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sButton!: boolean;

  trendingMovies!: Movie[];
  trendingTV!: TVResponse[];
  trendingMovies$!: Observable<Movie[]>;
  constructor(
    private tmdbService: TmdbService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTrendingTV();
    this.sButton = false;
  }

  getTrendingMovies() {
    this.tmdbService.getTrending('movie').subscribe((data) => {
      this.trendingMovies = data.results;
      this.trendingMovies$ = data.results;
    });
  }
  getTrendingTV() {
    this.tmdbService.getTrending('tv').subscribe((data) => {
      this.trendingTV = data.results;
    });
  }

  showButton(show: boolean) {
    this.sButton = show;
  }
}
