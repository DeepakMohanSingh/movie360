# Movie360

This simple Angular application fetches any movie details using the OMDB (Open Movie Database) API.

## Motivation

This was created as a hands-on project to deepen my understanding of Angular and to gain practical experience in making API calls within a web application.

## Features

- Search for movies by name
- Display movie details on click

## Getting Started

### Prerequisites

- Angular CLI
- Node.js
- Git
- API Key from [OMDB](http://www.omdbapi.com/apikey.aspx)

### Installation

1. Clone the repository
```bash
git clone https://github.com/DeepakMohanSingh/movie360.git
```

2. Go to the root directory of the cloned repository
```bash
cd movie360
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
ng serve
```

### Add your API key

Open the environment.ts file in src/environment folder, and replace <YOUR_API_KEY> with your key. It can be requested from [here](http://www.omdbapi.com/apikey.aspx).

``` typescript
export const environment = {
    OMDB_API_KEY: '<YOUR_API_KEY>'
}
```

### Play with it

- Open your browser and navigate to http://localhost:4200/
- Type a movie name in the search bar and press Enter.
- Click on a movie result to view its details.

### Live

[Here's](https://deepakmohansingh.github.io/movie360/) a hosted site (I am using free API and hence the results may fail if users have already reached 1000 hits in a month).
