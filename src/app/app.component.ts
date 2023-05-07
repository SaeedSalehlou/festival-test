import { Component } from '@angular/core';
import { LocalStorageService } from './core/services/localStorage/local-storage.service';
import { MOVIE_LIST_MOCKDATA } from './domain/mockData/movie-list-mockdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'festival-test';
  constructor(private localStorageService: LocalStorageService) {

    let list = MOVIE_LIST_MOCKDATA;
    localStorageService.saveData('MovieList', JSON.stringify(list));

  }
}
