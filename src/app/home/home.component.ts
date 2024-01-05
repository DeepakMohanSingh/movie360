import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchTerm = ''
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search']?.trim() || ''
    })
  }

  searchMovie() {
    this.router.navigate(['movies'], {
      queryParams: {
        search: this.searchTerm
      }
    });
  }
}
