import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private api_url = `https://www.omdbapi.com/?apikey=${environment.OMDB_API_KEY}&`

  constructor(private httpClient: HttpClient) {

  }

  getMovies(movieName: string, pageNumber: number): Observable<any> {
    const url = `${this.api_url}s=${movieName}&page=${(pageNumber >= 1 && pageNumber <= 100) ? pageNumber : 1}`
    return this.httpClient.get(url)
  }

  getMovieByImdbID(imdbID?: string) {
    const url = `${this.api_url}i=${imdbID}`
    return this.httpClient.get(url)
  }
}
