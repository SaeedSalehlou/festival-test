import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenersEnum } from 'src/app/domain/enums/movie/geners';
import { TypesEnum } from 'src/app/domain/enums/movie/types';
import { EnumModel } from 'src/app/domain/models/enum.model';
import { MovieModel } from 'src/app/domain/models/movie/movie.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  movieForm!: FormGroup;
  genersList = GenersEnum;
  typesList = TypesEnum;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MovieModel
  ) {

  }

  ngOnInit(): void {
    this._initFormElement();
  }
  private _initFormElement() {
    this.movieForm = new FormGroup({
      id: new FormControl(this.data.id, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
      startDate: new FormControl(this.data.startDate),
      endDate: new FormControl(this.data.endDate),
      type: new FormControl(this.data.type, Validators.required),
      country: new FormControl(this.data.country),
      gener: new FormControl(this.data.gener, Validators.required),
      score: new FormControl(this.data.score, [Validators.required, Validators.min(0), Validators.max(20)]),
      directorEmail: new FormControl(this.data.directorEmail, [Validators.email]),
      directorName: new FormControl(this.data.directorName, Validators.required),
    });
  }

  onSaveClick() {
    let newData = this.movieForm.value as MovieModel;
    if (newData.type == 0) newData.country = '';
    this.dialogRef.close(newData);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //#region Validation 
  getEmailErrorMessage() {
    return this.movieForm.get('directorEmail')!.hasError('directorEmail') ? 'Not a valid email' : '';
  }

  getdirectorNameErrorMessage() {
    return (this.movieForm.get('directorName')!.hasError('required')) ? 'You must enter a value' : ''
  }

  getMovieNameErrorMessage() {
    return (this.movieForm.get('name')!.hasError('required')) ? 'You must enter a value' : ''
  }

  getScoreErrorMessage() {
    if (this.movieForm.get('score')!.hasError('min')) {
      return 'You must enter a value between 0 - 20';

    }
    if (this.movieForm.get('score')!.hasError('max')) {
      return 'You must enter a value between 0 - 20';
    }

    return (this.movieForm.get('score')!.hasError('required')) ? 'You must enter a value' : ''

  }

  //#endregion

}
