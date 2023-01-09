import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    private movieID: any;

    constructor(private http: HttpClient) { }

    getMovies(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/movies?pn=' + page);
    }

    getCloudMovies() {
        return this.http.get('https://prod-53.northeurope.logic.azure.com:443/workflows/6fcc5204adb94a3d99f776a4061882d3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AYLqn29gDMD6Sz8FuIdUaeRXIurhXp8MkObEtwEItcY');
    }

    addCloudMovie(movie: any, file: any) {
        console.log(movie);
        let movieData = new FormData();
        movieData.append("fileName", movie.fileName);
        movieData.append("userID", movie.userID);
        movieData.append("title", movie.title);
        movieData.append("publisher", movie.publisher);
        movieData.append("producer", movie.producer);
        movieData.append("genre", movie.genre);
        movieData.append("ageRating", movie.ageRating);
        movieData.append("file", file);

        return this.http.post('https://prod-46.northeurope.logic.azure.com:443/workflows/3e5ca4b29f094b28b8139657b91898b4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1pIwEEr7yKZ4X3T4DT2ikM-_6GDcU4yINyOh25kMOrs', movieData);
    }

    deleteCloudMovie(id: any) {
        return this.http.delete(
            'https://prod-28.northeurope.logic.azure.com/workflows/7df2c6e6c2184204b9804616c9eee880/triggers/manual/paths/invoke/rest/v1/videos/' + id + '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DDzUMbxO_Wl8bMq9-Km-WGRSpwEMQV-RmQFSVnfqxU4');
    }

    getMovieCount() {
        return this.http.get('http://localhost:5000/api/v1.0/movieCount'); 
    }

    getMovie(id: any) {
        this.movieID = id;
        return this.http.get('http://localhost:5000/api/v1.0/movies/' + id);
    }

    searchMovieName(name: any) {
        return this.http.get('http://localhost:5000/api/v1.0/movies/searchName/' + name);
    }

    searchMovieYear(name: any) {
        return this.http.get('http://localhost:5000/api/v1.0/movies/searchYear/' + name);
    }

    searchMovieGenre(name: any) {
        return this.http.get('http://localhost:5000/api/v1.0/movies/searchGenre/' + name);
    }

    getReviews(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/movies/' + id + '/reviews');
    }

    postMovie(movie: any) {
        console.log(movie);
        let movieData = new FormData();
        movieData.append("Director", movie.Director);
        movieData.append("Genre", movie.Genre);
        movieData.append("Overview", movie.Overview);
        movieData.append("Poster_Link", movie.Poster_Link);
        movieData.append("Released_Year", movie.Released_Year);
        movieData.append("Runtime", movie.Runtime);
        movieData.append("Series_Title", movie.Series_Title);

        return this.http.post('http://localhost:5000/api/v1.0/movies', movieData);
    }

    postReview(review: any) {
        console.log(review);
        let postData = new FormData();
        postData.append("name", review.name);
        postData.append("text", review.review);
        postData.append("stars", review.stars);

        let today = new Date();
        let todayDate = today.getFullYear() + "-" +
            today.getMonth() + "-" +
            today.getDate();
        postData.append("date", todayDate);

        return this.http.post('http://localhost:5000/api/v1.0/movies/' + this.movieID + '/reviews', postData);
    }

    deleteReview(rid: any) {
        return this.http.delete(
            'http://localhost:5000/api/v1.0/movies/' + this.movieID + '/reviews/' + rid);
    }

    deleteMovie(mid: any) {
        return this.http.delete(
            'http://localhost:5000/api/v1.0/movies/' + mid);
    }

    updateReview(rid: any, review: any) {
        let newData = new FormData();
        newData.append("name", review.name);
        newData.append("text", review.review);
        newData.append("stars", review.stars);

        let today = new Date();
        let todayDate = today.getFullYear() + "-" +
            today.getMonth() + "-" +
            today.getDate();
        newData.append("date", todayDate);

        return this.http.put(
            'http://localhost:5000/api/v1.0/movies/' + this.movieID + '/reviews/' + rid, newData);
    }

    updateMovie(mid: any, movie: any) {
        let movieData2 = new FormData();
        movieData2.append("Director", movie.Director);
        movieData2.append("Genre", movie.Genre);
        movieData2.append("Overview", movie.Overview);
        movieData2.append("Poster_Link", movie.Poster_Link);
        movieData2.append("Released_Year", movie.Released_Year);
        movieData2.append("Runtime", movie.Runtime);
        movieData2.append("Series_Title", movie.Series_Title);

        return this.http.put(
            'http://localhost:5000/api/v1.0/movies/' + mid, movieData2);
    }

    updateFunny(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("funny", review.funny);

        return this.http.put(
            'http://localhost:5000/api/v1.0/movies/' + this.movieID + '/reviews/' + rid, newVote);
    }

    updateUseful(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("useful", review.useful);

        return this.http.put(
            'http://localhost:5000/api/v1.0/movies/' + this.movieID + '/reviews/' + rid, newVote);
    }

    updateCool(rid: any, review: any) {
        let newVote = new FormData();
        newVote.append("cool", review.cool);

        return this.http.put(
            'http://localhost:5000/api/v1.0/movies/' + this.movieID + '/reviews/' + rid, newVote);
    }

    updateReviewCount(movie: any) {
        let newReviewCount = new FormData();
        newReviewCount.append("Review_Count", movie.Review_Count);

        return this.http.put(
            'http://localhost:5000/api/v1.0/movies/' + this.movieID, newReviewCount);
    }
}