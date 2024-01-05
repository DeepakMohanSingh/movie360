import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SearchResultsComponent } from './search-results-handler/search-results/search-results.component';
import { SearchResultsHandlerModule } from './search-results-handler/search-results-handler.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: SearchResultsComponent,
    data: {
      search: ':searchTerm',
      page: ':pageNumber'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
