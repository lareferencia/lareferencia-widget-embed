import { Component, Input, OnInit } from '@angular/core';
import { lareferenciaWidgetEmbedService } from './lareferencia-widget-embed.service';
import { LareferenciaWidgets } from './lareferencia-widget-embed.interface';

@Component({
  selector: 'lib-lareferencia-widget-embed',
  template:`
  <div class="widget_container">
    <div>
        <div id="lareferencia" ></div>
    </div> 
  </div> `,
  styles: [
  ]
})
export class lareferenciaWidgetEmbedComponent implements OnInit {
  @Input() widgetType: string;
  public widgetId: string;

  constructor( private widgetConfigService: lareferenciaWidgetEmbedService) { }

  ngOnInit(): void {
    this.widgetConfigService.getWidgetConfig().subscribe((data: LareferenciaWidgets) => {
      this.widgetId = data['lareferencia-widgets'][this.widgetType].parameters.widget_div_id
      this.resultHandler(data['lareferencia-widgets'][this.widgetType])
    })    
  };

  resultHandler(widget_data: any){
    
  window[this.widgetType] = { parameters: widget_data.parameters }

  const widget = document.createElement('script');
  widget.src = widget_data.widget_url;
    
  const container = document.getElementById('lareferencia');
  const containerId = `lareferencia-${widget_data.parameters.widget_div_id}`
  container.id = containerId;

  const div = document.createElement('div');
  const divId = widget_data.parameters.widget_div_id
  div.id = divId;

    if (container && container.id === containerId) {
       container.appendChild(div);
       container.appendChild(widget);
    }
  }

}
