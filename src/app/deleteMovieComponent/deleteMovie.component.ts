import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'deleteMovie',
    templateUrl: './deleteMovie.component.html',
    styleUrls: ['./deleteMovie.component.css']
})

export class DeleteMovieComponent {

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

        this.movie_list = this.webService.getCloudMovies();
        console.log(this.movie_list);
    }

    onDeleteMovie(movie: any) {
        console.log(movie); 
        let id = movie.filePath;
        let slice = id.slice(21, 39);
        console.log("Sliced string is: " + slice); 

        this.webService.deleteCloudMovie(slice).subscribe((response: any) => {
            this.movie_list = this.webService.getCloudMovies();
        })
    }
}