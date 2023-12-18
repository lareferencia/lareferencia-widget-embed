import { NgModule } from '@angular/core';
import { lareferenciaWidgetEmbedComponent } from './lareferencia-widget-embed.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    lareferenciaWidgetEmbedComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    lareferenciaWidgetEmbedComponent
  ]
})
export class lareferenciaWidgetEmbedModule { }
