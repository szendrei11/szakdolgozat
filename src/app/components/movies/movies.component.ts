import { Component, OnInit } from '@angular/core';
import { Movie, TmdbService } from 'src/app/services/tmdb.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  page: number = 1;
  total_results: number = 0;

  constructor(private Movies: TmdbService, private router: Router) {}
  ngOnInit(): void {
    this.getPage(this.page);
  }
  getPage(page: number) {
    this.Movies.getPopular('movie', page).subscribe((data) => {
      console.log(data);
      this.movies = data.results;
      this.page = data.page;
      this.total_results = data.total_results;
    });
  }
}
