import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from 'src/app/core/services/movie/movies.service';
import { MovieModel } from 'src/app/domain/models/movie/movie.model';
import { ResponseModel } from 'src/app/domain/models/response.model';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { GenersEnum } from 'src/app/domain/enums/movie/geners';
import { TypesEnum } from 'src/app/domain/enums/movie/types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  currentRow = 0;
  generEnumList = GenersEnum;
  typeEnumList = TypesEnum;
  displayedColumns: string[] =
    [
      'name',
      'directorName',
      'type',
      'country',
      'gener',
      'score',
      'startDate',
      'endDate',
      'directorEmail',
    ]
  dataSource = new MatTableDataSource();
  repos!: MovieModel[];

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }


  loading: boolean = false;
  errorMessage!: string;

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.repos = this.movieService.get();

    this.dataSource.data = this.repos.sort(
      (a, b) => {
        return b.score - a.score;
      });

  }
  search(searchTerm: string) {
    let filterData = this.repos.filter(
      (current) => {
        return current.name?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          current.directorName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      }
    )
    this.dataSource.data = filterData;
  }


  //#region Actions
  add() {
    let row: MovieModel = {
      id: 0,
      name: '',
      startDate: '',
      endDate: '',
      type: 0,
      country: '',
      gener: 0,
      score: 0,
      directorEmail: '',
      directorName: ''
    }
    const dialogRef = this.dialog.open(
      EditComponent, {
      data: row,
    });
    dialogRef.afterClosed().
      subscribe(
        (newData: MovieModel) => {
          if (newData) {
            let response: ResponseModel = this.movieService.create(newData);

            if (response.status) {
              this.loadData();

            }
            else
              this.openSnackBar(response);
          }
        }
      );
  }

  edit(row: MovieModel) {
    const dialogRef = this.dialog.open(
      EditComponent, {
      data: row,
    });
    dialogRef.afterClosed().
      subscribe(
        (newData: MovieModel) => {
          if (newData) {
            let response: ResponseModel = this.movieService.update(newData);

            if (response.status) {
              this.loadData();

            }
            else
              this.openSnackBar(response)
          }
        }
      );
  }
  delete(row: MovieModel) {

    const dialogRef = this.dialog.open(
      DeleteComponent, {
      data: row,
    });

    dialogRef.afterClosed().
      subscribe(
        res => {
          if (res) {
            let res = this.movieService.delete(row.id);
            if (res) {
              this.loadData();
            }
            else {
              let res: ResponseModel = {
                message: 'The Customer was n\'t Delete.',
                status: false

              };
              this.openSnackBar(res);

            }
          }
        }
      );

  }
  deleteAll() {
    const dialogRef = this.dialog.open(
      DeleteComponent, {
      data: null,
    });
    dialogRef.afterClosed().
      subscribe(
        res => {
          if (res) {
            let res = this.movieService.deleteAll();
            if (res) {
              this.loadData();
            }
            else {
              let res: ResponseModel = {
                message: 'The Customer was n\'t Delete.',
                status: false

              };
              this.openSnackBar(res);
            }
          }
        }
      );

  }
  //#endregion Actions

  private openSnackBar(response: ResponseModel) {
    this.snackBar.open(response.message, 'Close!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}


