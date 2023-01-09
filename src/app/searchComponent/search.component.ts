import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    movie_list: any = [];

    constructor(private webService: WebService,
        private route: ActivatedRoute) { }

    searchMovie(name: any) {
        if (name == "") {
            this.movie_list = [];
        }
        else if (name.startsWith("1") || name.startsWith("2")) {
            console.log("Searching by Year...");
            this.webService.searchMovieYear(name).subscribe((response: any) => {
                this.movie_list = response;
                console.log(this.movie_list)
            });
        }
        else if (name == "Crime" || name == "Action" || name == "Drama" || name == "Comedy" || name == "Animation" || 
        name == "Horror" || name == "Western" || name == "Mystery" || name == "Adventure" || name == "Drama"
        || name == "Film-Noir" || name == "Western" || name == "Biography") {
            console.log("Searching by Genre...");
            this.webService.searchMovieGenre(name).subscribe((response: any) => {
                this.movie_list = response;
                console.log(this.movie_list)
            });
        }
        else {
            this.webService.searchMovieName(name).subscribe((response: any) => {
                console.log("Searching by Name...");
                this.movie_list = response;
                console.log(this.movie_list)
            });
        }    
    }
}
