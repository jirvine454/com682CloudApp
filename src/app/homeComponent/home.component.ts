import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    color: any;
    cols: any;
    rows: any;
    text: any;
    tiles: any = [];

    constructor(public authService: AuthService) {

    }

    ngOnInit() {

        this.tiles = [
            { cols: 2, rows: 1, color: 'darkblue', link: "", img: "https://i.pinimg.com/originals/34/9c/8d/349c8df36bc0784cb6f8065b1a8ea354.jpg"},
            { cols: 1, rows: 3, color: 'lightgreen', link: "", img: "https://getwallpapers.com/wallpaper/full/8/8/2/260947.jpg" },
            { cols: 1, rows: 2, color: 'lightgray', link: "https://www.hollywoodreporter.com/", img: ""},
            { cols: 1, rows: 2, color: 'lightyellow', link: "", img: "https://th.bing.com/th/id/R.867f430f7c035aa41af54e9dc57b8332?rik=uabaNSQ46z6eXg&pid=ImgRaw&r=0"},
      ];

    }
}