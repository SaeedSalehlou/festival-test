import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieModel } from 'src/app/domain/models/movie/movie.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  movieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MovieModel
  ) { }

  ngOnInit(): void {
    this._initFormElement();
  }
  private _initFormElement() {
    this.movieForm = new FormGroup({
      id: new FormControl(this.data.id, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
      startDate: new FormControl(this.data.startDate, Validators.required),
      endDate: new FormControl(this.data.endDate, Validators.required),
      type: new FormControl(this.data.type, Validators.required),
      country: new FormControl(this.data.country, Validators.required),
      gener: new FormControl(this.data.gener, Validators.required),
      score: new FormControl(this.data.score, Validators.required),
      directorEmail: new FormControl(this.data.directorEmail, [Validators.required, Validators.email]),
      directorName: new FormControl(this.data.directorName, Validators.required),


    });
  }

}
