import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movieForm = new FormGroup({
    searchTerm: new FormControl({
      value: '',
      disabled: false
    },
      [
        Validators.required,
        Validators.pattern("^[\\s]*[^\\s].*$")
      ])
  });

  constructor(private router: Router) {

  }

  searchMovie() {
    if (this.movieForm.valid) {
      this.router.navigate(['movies'], {
        queryParams: {
          search: this.movieForm.controls['searchTerm'].value
        }
      });
    }
  }
}
