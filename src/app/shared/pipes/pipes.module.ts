import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate/truncate.pipe'

@NgModule({
  declarations: [
    TruncatePipe
  ],
  exports: [
    TruncatePipe
  ]
})
export class PipesModule { }
