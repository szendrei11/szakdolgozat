import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Credits,
  Images,
  MovieDetails,
  TmdbService,
  TVResponse,
  Videos,
} from 'src/app/services/tmdb.service';
import {
  OmdbService,
  Rating,
  OmdbResponse,
} from 'src/app/services/omdb.service';
import { EMPTY, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { Gallery, GalleryItem, ImageItem, YoutubeItem } from 'ng-gallery';
import { mdblistResponse } from 'src/app/services/mdblist.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  galleryId = 'myLightbox';
  images: any = [];
  trailers: any = [];
  trailerGalleryId = 'trailerGalleryId';
  constructor(
    private route: ActivatedRoute,
    public gallery: Gallery,
    public gallery2: Gallery
  ) {}
  unsubscribe$: Subject<void> = new Subject<void>();

  //@Input() tmdbDetails!: MovieDetails;

  tmdbdd$!: Observable<MovieDetails>;
  omdbdd$!: Observable<mdblistResponse>;
  backdrop_path?: any;
  ngOnInit(): void {
    this.tmdbdd$ = this.route.snapshot.data['data'];
    this.omdbdd$ = this.route.snapshot.data['ratings'];
    this.fetchItemtoGallery();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchItemtoGallery() {
    this.tmdbdd$.subscribe((data: any) => {
      if (data.backdrop_path != null) {
        this.backdrop_path = data.backdrop_path;
      }
      console.log(data.videos.results.length !== 0);
      if (data.videos.results.length !== 0) {
        console.log('bent');
        this.fetchTrailersToGallery(data.videos.results);
      }
      console.log(this.trailers === null);
      if (data.images != []) {
        this.fetchImagesToGallery(data.images);
      }
    });
  }
  fetchImagesToGallery(images: any) {
    images.backdrops.forEach((obj: any) => {
      this.images.push(
        new ImageItem({
          src: this.getBackdropImage(obj.file_path, 'original'),
          thumb: this.getImage(obj.file_path, 'w300'),
        })
      );
    });
    const galleryRef2 = this.gallery.ref(this.galleryId);
    galleryRef2.load(this.images);
  }
  fetchTrailersToGallery(videos: any) {
    videos.forEach((obj: any) => {
      if (obj.type === 'Trailer' /*|| obj.type === 'Teaser'*/) {
        this.trailers.push(new YoutubeItem({ src: obj.key }));
      }
    });
    const galleryRef = this.gallery2.ref(this.trailerGalleryId);
    galleryRef.load(this.trailers);
  }

  getImage(path: any, size: any) {
    return 'https://image.tmdb.org/t/p/' + size + path;
  }

  getBackdropImage(path: any, size: any) {
    return 'https://image.tmdb.org/t/p/' + size + path;
  }

  getProfilImage(path: any) {
    return 'https://image.tmdb.org/t/p/w185' + path;
  }
  getPosterImage(path: any) {
    return 'https://image.tmdb.org/t/p/185' + path;
  }
}
