import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Movie, MovieDetails } from 'src/app/models/movie';
import { OmdbService } from 'src/app/services/omdb.service';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnChanges {
  fetchingDetails: boolean;
  errorResponse: string | undefined;
  @Input() movie: Movie | undefined;
  @Output() movieDetailsEventEmitter = new EventEmitter<any>();
  movieDetails: MovieDetails | undefined;

  constructor(private omdbService: OmdbService) {
    this.fetchingDetails = true;
  }

  ngOnInit(): void {
    this.fetchDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchDetails();
  }

  fetchDetails() {
    this.fetchingDetails = true
    this.errorResponse = undefined

    this.omdbService.getMovieByImdbID(this.movie?.imdbID).subscribe((data: any) => {
      console.log("DETAILS", data)
      if ((!data) || (data.response == "False" || data.Response == "False")) {
        this.errorResponse = "Unable to fetch details :("
      }
      else {
        this.movieDetails = {
          actors: data.Actors || data.actors,
          director: data.Director || data.director,
          genre: data.Genre || data.genre,
          language: data.Language || data.language,
          poster: data.Poster || data.poster,
          ratings: [],
          released: data.Released || data.released,
          runtime: data.Runtime || data.runtime,
          title: data.Title || data.title,
          type: data.Type || data.type,
          writer: data.Writer || data.writer,
          year: data.Year || data.year,
          plot: data.Plot || data.plot
        }
        if (data.Ratings?.length || data.ratings?.length) {
          const ratings = data.Ratings || data.ratings
          ratings.forEach((rating: any) => {
            if (this.movieDetails)
              this.movieDetails.ratings.push({
                source: rating.Source || rating.source,
                value: rating.Value || rating.value
              })
          })
        }
      }
      console.log("MOV", this.movieDetails)
      this.fetchingDetails = false
    },
      (errorResponse: any) => {
        this.errorResponse = errorResponse.error
        this.fetchingDetails = false
      })
  }

  closeDetails() {
    this.movieDetailsEventEmitter.emit();
  }
}
