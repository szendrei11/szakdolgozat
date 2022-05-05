import { Component, OnInit } from '@angular/core';
import { TmdbService, TVResponse } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
  items: TVResponse[] = [];
  page: number = 1;
  total_results: number = 0;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.getPage(this.page);
  }
  getPage(page: number) {
    this.tmdbService.getPopular('tv', page).subscribe((data) => {
      this.items = data.results;
      this.page = data.page;
      this.total_results = data.total_results;
    });
  }
}
