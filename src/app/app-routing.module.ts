import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HomeResolver } from './resolvers/home.resolver';
import { DetailsResolver } from './resolvers/details.resolver';
import { TvResolver } from './resolvers/tv.resolver';
import { TvComponent } from './components/tv/tv.component';
import { ResultComponent } from './components/result/result.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';
import { SeriesComponent } from './components/series/series.component';
import { OmdbDetailsResolver } from './resolvers/omdbdetails.resolver';

const routes: Routes = [
  {
    path: 'home',
    runGuardsAndResolvers: 'always',
    component: HomeComponent,
    resolve: { data: HomeResolver },
  },
  {
    path: 'movie/:id',
    component: ItemComponent,
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
    resolve: { data: DetailsResolver, ratings: OmdbDetailsResolver },
  },
  {
    path: 'tv/:id',
    component: TvComponent,
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
    resolve: { data: TvResolver },
  },
  { path: 'movies', component: MoviesComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'result/:name', component: ResultComponent },

  { path: 'signin', component: SigninComponent },

  { path: 'signup', component: SignupComponent },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
