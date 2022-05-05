import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { ItemComponent } from './components/item/item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MoviesComponent } from './components/movies/movies.component';
import { TvComponent } from './components/tv/tv.component';
import { MovieComponent } from './components/movie/movie.component';
import { ResultComponent } from './components/result/result.component';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SeriesComponent } from './components/series/series.component';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LayoutComponent,
    ItemComponent,
    MoviesComponent,
    TvComponent,
    MovieComponent,
    ResultComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    SeriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule,
    MatMenuModule,
    MatGridListModule,
    LayoutModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,

    GalleryModule.withConfig({ imageSize: 'cover', thumb: false }),
    LightboxModule.withConfig({ panelClass: 'fullscreen' }),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
