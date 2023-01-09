import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})

export class MovieComponent {

    movie_list: any = [];
    reviews: any = [];
    movieForm: any;
    movieForm2: any;
    reviewForm: any;
    voteForm: any;
    currentReviewID: any;
    currentMovieID: any;
    funny: number = 0;
    useful: number = 0;
    cool: number = 0;
    hide: boolean = false;

    constructor(private webService: WebService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {

        this.reviewForm = this.formBuilder.group({
            name: ['', Validators.required],
            review: ['', Validators.required],
            stars: 5
        });

        this.movieForm2 = this.formBuilder.group({
            Director: ['', Validators.required],
            Genre: ['', Validators.required],
            Overview: ['', Validators.required],
            Poster_Link: ['', Validators.required],
            Released_Year: ['', Validators.required],
            Runtime: ['', Validators.required],
            Series_Title: ['', Validators.required]
        });

        this.movie_list = this.webService.getMovie(
            this.route.snapshot.params['id']);
    }

}