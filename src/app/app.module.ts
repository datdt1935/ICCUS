import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewHomeComponent } from './view-home/view-home.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewCreateNewComponent } from './view-create-new/view-create-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ViewHomeComponent, ViewCreateNewComponent],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
