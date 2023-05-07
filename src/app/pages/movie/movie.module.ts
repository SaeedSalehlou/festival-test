import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from 'src/app/shared/ui-kits/material/material.module';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    MovieComponent,
    ListComponent,
    DeleteComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MaterialModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()]

})
export class MovieModule { }
