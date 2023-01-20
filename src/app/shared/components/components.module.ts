import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterLink } from '@angular/router';
import { ImageShowcaseComponent } from './image-showcase/image-showcase.component';
import { TopBarComponent } from './top-bar/top-bar.component'
import { PipesModule } from '../pipes/pipes.module';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    LoaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ImageShowcaseComponent,
    TopBarComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    PipesModule
  ],
  exports: [
    SearchBarComponent,
    LoaderComponent,
    ProductListComponent,
    ImageShowcaseComponent,
    TopBarComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
