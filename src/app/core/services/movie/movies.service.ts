import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { MovieModel } from 'src/app/domain/models/movie/movie.model';
import { ResponseModel } from 'src/app/domain/models/response.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  localStorageKey = 'MovieList'
  constructor(private localStorageService: LocalStorageService) { }

  //#region Crud Actions
  get(): MovieModel[] {
    let res: MovieModel[] = JSON.parse(this.localStorageService.getData(this.localStorageKey) || '');
    return res;
  }

  create(newModel: MovieModel): ResponseModel {
    let responseModel: ResponseModel = { message: '', status: false };

    let mockData: MovieModel[] = this.get();
    const id: number = mockData.length + 1;

    if (!this.checkExist(newModel)) {
      mockData.push({ ...newModel, id });
      this.localStorageService.saveData(this.localStorageKey, JSON.stringify(mockData));
      responseModel.status = true;
      responseModel.message = 'Create Movie Successful';
    }
    else {
      responseModel.status = false;
      responseModel.message = 'The operation failed';
    }
    return responseModel;
  }

  update(updateModel: MovieModel): ResponseModel {
    let responseModel: ResponseModel = { message: '', status: false };
    let mockData: MovieModel[] = this.get();
    let check = this.checkExist(updateModel);
    if (!check) {
      mockData[updateModel.id - 1] = updateModel
      this.localStorageService.saveData(this.localStorageKey, JSON.stringify(mockData));
      responseModel.status = true;
      responseModel.message = 'Edit Movie Successful';
    }
    else {
      responseModel.status = false;
      responseModel.message = 'The operation failed';
    }
    return responseModel;

  }

  delete(movieId: number): boolean {
    let mockData: MovieModel[] = this.get();

    mockData = mockData.filter(
      (model: MovieModel) => {
        return model.id !== movieId;
      });
    this.localStorageService.saveData(this.localStorageKey, JSON.stringify(mockData));
    return true;
  }
  deleteAll(): boolean {
    this.localStorageService.saveData(this.localStorageKey, JSON.stringify([]));
    return true;
  }
  //#endregion Crud Actions

  //#region private method
  private checkExist(newData: MovieModel): boolean {
    let mockData = this.get();
    return mockData.some(
      (oldData) => {
        return (
          oldData.name === newData.name &&
          oldData.directorName === newData.directorName &&
          oldData.id != newData.id
        );
      }
    );

  }
  //#endregion private method
}
