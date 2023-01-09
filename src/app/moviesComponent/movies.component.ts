import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})

export class MoviesComponent {

    movie_list: any = [];
    page: number = 1;
    movie_count: any = 0;
    movieForm: any;

    constructor(public webService: WebService,
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        if (sessionStorage['page']) {
            this.page = Number(sessionStorage['page']);
        }

        this.movieForm = this.formBuilder.group({
            Director: ['', Validators.required],
            Genre: ['', Validators.required],
            Overview: ['', Validators.required],
            Poster_Link: ['', Validators.required],
            Released_Year: ['', Validators.required],
            Runtime: ['', Validators.required],
            Series_Title: ['', Validators.required]
        });

        this.movie_list = this.webService.getMovies(this.page);

        this.webService.getMovieCount().subscribe(res => { this.movie_count = res });
    }

    previousPage() {
        if (this.page > 1) {                             // Unable to go before first page
            this.page = this.page - 1;
            sessionStorage['page'] = this.page;
            this.movie_list =
                this.webService.getMovies(this.page);
        }
    }

    selectPage(pageNum: number) {
        this.page = pageNum;
        sessionStorage['page'] = this.page;
        this.movie_list =
            this.webService.getMovies(this.page);
    }

    lastPage() {

        this.page = this.movie_count / 10;
        console.log("Total Number of Movie Documents: " + this.movie_count + " meaning last page is " + this.page);
        sessionStorage['page'] = this.page;
        this.movie_list =
            this.webService.getMovies(this.page);
    }

    nextPage() {
        let lastPage = this.movie_count / 10;

        if (this.page < lastPage) {                         // Unable to go past last page
            this.page = this.page + 1;
            sessionStorage['page'] = this.page;
            this.movie_list =
                this.webService.getMovies(this.page);
        }
    }

    selectCustomPage(page: any) {
        this.page = page;
        sessionStorage['page'] = this.page;
        this.movie_list =
            this.webService.getMovies(this.page);
    }

    onAddMovie() {
        this.webService.postMovie(this.movieForm.value).subscribe((response: any) => {
            this.movieForm.reset();
            this.movie_list = this.webService.getMovies(this.page);
            this.openSnackBar("Movie has been successfully added!");
        });
        console.log(this.movieForm.value); 
    }

    isInvalid(control: any) {
        return this.movieForm.controls[control].invalid && this.movieForm.controls[control].touched;
    }

    isUntouched() {
        return this.movieForm.controls.Director.pristine || 
                this.movieForm.controls.Genre.pristine || 
                this.movieForm.controls.Overview.pristine || 
                this.movieForm.controls.Poster_Link.pristine || 
                this.movieForm.controls.Released_Year.pristine || 
                this.movieForm.controls.Runtime.pristine || 
                this.movieForm.controls.Series_Title.pristine;
    }

    isIncomplete() {
        return this.isInvalid('Director') ||
            this.isInvalid('Genre') ||
            this.isInvalid('Overview') ||
            this.isInvalid('Poster_Link') ||
            this.isInvalid('Released_Year') ||
            this.isInvalid('Runtime') ||
            this.isInvalid('Series_Title') ||
            this.isUntouched();
    }

    openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, { duration: 5 * 1000 });
      }
}