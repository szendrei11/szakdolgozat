import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { OmdbResponse, OmdbService } from 'src/app/services/omdb.service';
import { MovieDetails, TVResponse } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private router: Router
  ) {}
  unsubscribe$: Subject<void> = new Subject<void>();

  //@Input() tmdbDetails!: MovieDetails;

  tmdbdd$!: Observable<TVResponse>;
  omdbdd$?: Observable<OmdbResponse>;
  backdrop_path?: any;
  ngOnInit(): void {
    this.route.snapshot.data['data'].subscribe((data: any) => {
      console.log(data.type);
      if (data != null) {
        this.tmdbdd$ = this.route.snapshot.data['data'];

        if (data.backdrop_path != null) {
          this.backdrop_path = data.backdrop_path;
        }
        console.log('title' + data.name);
        this.omdbdd$ = this.omdbService.getDataByTitle(data.original_name);
        this.omdbdd$ = this.omdbService.getDataByTitle(data.original_name);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBackdropImage(path: any) {
    return 'https://image.tmdb.org/t/p/w780' + path;
  }

  getProfilImage(path: any) {
    return 'https://image.tmdb.org/t/p/w185' + path;
  }
  getPosterImage(path: any) {
    return 'https://image.tmdb.org/t/p/185' + path;
  }
}
