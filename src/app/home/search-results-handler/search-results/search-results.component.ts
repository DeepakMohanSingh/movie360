import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { OmdbService } from 'src/app/services/omdb.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  showSearchResults: boolean;
  movieName: string;
  searchTerm: string
  pageNumber: number;
  fetchingMovies: boolean;
  errorResponse: string | undefined;
  movies: Movie[];
  moviesToRender: Movie[];
  selectedMovie: Movie | undefined;
  showMovieDetails: boolean;
  totalResults: number;
  fetchedResults: number;

  constructor(private route: ActivatedRoute, private router: Router, private omdbService: OmdbService) {
    this.showSearchResults = false
    this.fetchingMovies = false;
    this.movieName = ''
    this.searchTerm = ''
    this.pageNumber = 1
    this.movies = []
    this.moviesToRender = []
    this.showMovieDetails = false
    this.totalResults = 0
    this.fetchedResults = 0
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showSearchResults = false
      this.showMovieDetails = false
      console.log(params)
      let previousMovieName: string = ''
      if (this.movieName)
        previousMovieName = this.movieName
      this.movieName = params['search']?.trim() || ''
      this.searchTerm = this.movieName
      this.pageNumber = params['page'] ? Number(params['page']) : 1
      if (this.isValidMovieName()) {
        if (previousMovieName != this.movieName) {
          this.movies = []
          this.fetchedResults = 0
        }
        if (this.fetchedResults == 0 && this.pageNumber > 1) {
          this.router.navigate(['movies'], {
            queryParams: {
              search: this.movieName,
              page: 1
            }
          });
        }
        this.fetchMovies()
      }
      else {
        this.errorResponse = "Please enter a movie name"
        this.showSearchResults = true
      }
    })
  }

  isValidMovieName() {
    return !!this.movieName?.trim()
  }

  fetchMovies() {
    this.fetchingMovies = true
    this.showSearchResults = true
    this.errorResponse = undefined

    this.omdbService.getMovies(this.movieName, this.pageNumber).subscribe((data: any) => {
      console.log(data)
      if (data.response == "False" || data.Response == "False") {
        this.errorResponse = "No such movie that I know of :("
      }
      else {
        const results: any[] = data.search || data.Search
        results.forEach(result => {
          this.movies.push({
            title: result.title || result.Title,
            type: result.type || result.Type,
            imdbID: result.imdbID || result.ImdbID,
            year: result.year || result.Year,
            poster: result.poster || result.Poster
          })
        })
        this.fetchedResults += results.length
        this.totalResults = Number(data.totalResults || data.TotalResults)
        this.moviesToRender = this.movies.slice((this.pageNumber - 1) * 10, this.pageNumber * 10)
        console.log(this.movies, this.fetchedResults, this.totalResults)
      }
      this.fetchingMovies = false
    },
      errorResponse => {
        this.errorResponse = errorResponse.error
        this.fetchingMovies = false
      })
  }

  requestMovieDetails(movie: Movie) {
    this.selectedMovie = movie
    this.showMovieDetails = true
  }

  searchMovie() {
    this.router.navigate(['movies'], {
      queryParams: {
        search: this.searchTerm
      }
    });
  }
}
