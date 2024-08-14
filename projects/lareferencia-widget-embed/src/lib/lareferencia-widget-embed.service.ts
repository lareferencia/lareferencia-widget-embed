import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class lareferenciaWidgetEmbedService {
  private widgetConfigUrl = './assets/data/widget.config.json';

  constructor(private http: HttpClient) {}

  getWidgetConfig(): Observable<any> {
    return this.http.get(this.widgetConfigUrl);
  }
}
