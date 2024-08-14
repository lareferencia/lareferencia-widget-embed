import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { lareferenciaWidgetEmbedComponent } from 'lareferencia-widget-embed';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    lareferenciaWidgetEmbedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
