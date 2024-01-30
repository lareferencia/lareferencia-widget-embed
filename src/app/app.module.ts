import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { lareferenciaWidgetEmbedModule } from '../../projects/lareferencia-widget-embed/src/lib/lareferencia-widget-embed.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    lareferenciaWidgetEmbedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
