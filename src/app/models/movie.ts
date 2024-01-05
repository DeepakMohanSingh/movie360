export interface Movie {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
}

export interface MovieDetails {
    actors: string;
    director: string;
    genre: string;
    language: string;
    title: string;
    poster: string;
    type: string;
    writer: string;
    year: string;
    released: string;
    runtime: string;
    ratings: MovieRating[];
    plot: string;
}

export interface MovieRating {
    source: string;
    value: string;
}