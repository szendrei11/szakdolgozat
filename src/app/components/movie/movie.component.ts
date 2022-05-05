import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { OmdbResponse, OmdbService } from 'src/app/services/omdb.service';
import { MovieDetails } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private router: Router
  ) {}
  unsubscribe$: Subject<void> = new Subject<void>();

  //@Input() tmdbDetails!: MovieDetails;

  tmdbdd$!: Observable<MovieDetails>;
  omdbdd$?: Observable<OmdbResponse>;
  backdrop_path?: any;
  ngOnInit(): void {
    this.route.snapshot.data['data'].subscribe((data: any) => {
      if (data != null) {
        this.tmdbdd$ = this.route.snapshot.data['data'];

        if (data.backdrop_path != null) {
          this.backdrop_path = data.backdrop_path;
        }
        if (data.imdb_id != null) {
          this.omdbdd$ = this.omdbService.getDataById(data.imdb_id);
        }
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBackdropImage(path: any) {
    return 'https://image.tmdb.org/t/p/w1280' + path;
  }

  getProfilImage(path: any) {
    return 'https://image.tmdb.org/t/p/w185' + path;
  }
  getPosterImage(path: any) {
    return 'https://image.tmdb.org/t/p/185' + path;
  }
}
