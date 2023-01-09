import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './moviesComponent/movies.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './homeComponent/home.component';
import { MovieComponent } from './movieComponent/movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './navComponent/nav.component';
import { ProfileComponent } from './profileComponent/profile.component';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './searchComponent/search.component'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboardComponent/dashboard.component';
import { addMovieComponent } from './addMovieComponent/addMovie.component';
import { DeleteMovieComponent } from './deleteMovieComponent/deleteMovie.component';

var routes: any = [ {
  path: '', 
  component: HomeComponent
  },
  {
  path: 'movies', 
  component: MoviesComponent
  },
  {
  path: 'movies/:id', 
  component: MovieComponent
  },
  {
  path: 'search',
  component: SearchComponent
  },
  {
  path: 'addMovie',
  component: addMovieComponent
  },
  {
  path: 'deleteMovie',
  component: DeleteMovieComponent
  },
  {
  path: 'myProfile',
  component: ProfileComponent
  },
  {
  path: 'dashboard',
  component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HomeComponent,
    MovieComponent,
    NavComponent,
    ProfileComponent,
    SearchComponent,
    DashboardComponent,
    addMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule, 
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    AuthModule.forRoot( {
      domain:'dev-2hct0ry2urm4oaqi.uk.auth0.com',
      clientId: '1EcSJGEQg9vitGQZF9EX7lovPoyW6zKy'
      })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
