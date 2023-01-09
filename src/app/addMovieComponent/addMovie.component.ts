import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'addMovie',
    templateUrl: './addMovie.component.html',
    styleUrls: ['./addMovie.component.css']
})

export class addMovieComponent {

    movie_list: any = [];
    reviews: any = [];
    addMovieForm: any;
    selectedFile = null;

    constructor(private webService: WebService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {

        this.addMovieForm = this.formBuilder.group({
            fileName: ['', Validators.required],
            userID: ['', Validators.required],
            title: ['', Validators.required],
            publisher: ['', Validators.required],
            producer: ['', Validators.required],
            genre: ['', Validators.required],
            ageRating: ['', Validators.required],
        });
    }

    onFileSelected(event: any) {
        console.log(event); 
        this.selectedFile = event.target.files[0]; 
    }

    onCreateMovie() {
        console.log(this.addMovieForm.value);

        this.webService.addCloudMovie(this.addMovieForm.value, this.selectedFile).subscribe((response: any) => {
            this.addMovieForm.reset();
        });
    }
}