# Lareferencia-widget-embed

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Instalar en dSPACE

Ejecutar `npm install lareferencia-widget-embed` dentro del directorio del código fuente de angular (i.e. dspace-angular-dspace-7.6)
> Note: Si ves errores de dependencias puedes usar `npm install lareferencia-widget-embed --force` o intentar arreglar los errores, esta libreria solo tiene como dependecias angular/core, cualquier otro error probablemente sea de dSPACE por lo cual recomendamos utilizar --force en este caso.
De esta forma la carpeta lareferencia-widget-embed quedaría instalada dentro de dspace-angular-dspace-7.6/node_modules

## Utilizar lareferencia-widget-embed.

Importar "lareferenciaWidgetEmbedModule" en tu proyecto dSPACE, recomendamos importarlo en shared.module.ts en la carpeta "shared", el cual deberia encontrarse en src/app/shared/shared.module.ts, de esta forma:
```
import { lareferenciaWidgetEmbedModule } from 'lareferencia-widget-embed';

const MODULES = [
CommonModule,
FormsModule,
InfiniteScrollModule,
NgbNavModule,
NgbTypeaheadModule,
NgbPaginationModule,
NgbDropdownModule,
NgbTooltipModule,
ReactiveFormsModule,
RouterModule,
DragDropModule,
GoogleRecaptchaModule,
MenuModule,
NgxPaginationModule,
lareferenciaWidgetEmbedModule,
];
```

![Alt text](image-1.png)
![Alt text](image.png)

De esta forma podras utilizar el componente <lib-lareferencia-widget-embed></lib-lareferencia-widget-embed> en cualquier template html lugar donde estes importanto el modulo "SharedModule".

## Elegir e insertar el widget 

Debes elegir el widget pasando el tipo [widgetType] en el componente, de momento solo puedes utilizar 'lrw'

Por ejemplo:
```
<lib-lareferencia-widget-embed [widgetType]="'lrw'"></lib-lareferencia-widget-embed>
```
## Insertar el widget en la vista sencilla del ítem
DSpace 7 ofrece la posibilidad de organizar el repositorio en colecciones de ítems regulares (como los de las versiones anteriores) e ítems de tipo entidad. Las plantillas para modificar la forma en la que se muestran los metadatos en su vista sencilla se encuentran en el directorio[temaHabilitado]/item-page/simple/item-types

Si se quiere modificar la vista de la entidad de tipo publicación, el widget debe insertarse en el archivo 
```
item-page/simple/item-types/publication/publication.component.html
```

Si se quiere modificar la vista del ítem regular (los utilizados en las versiones de DSpace anteriores), el widget debe insertarse en el archivo 
```
item-page/simple/item-types/untyped-item/untyped-item.component.hml
```
Recuerda que para insertar el llamado al widget se debe colocar en el html la siguiente linea
```
<lib-lareferencia-widget-embed [widgetType]="'lrw'"></lib-lareferencia-widget-embed>
```
Por ejemplo, si se desea desplegar el widget luego del listado de autores, el html debe verse de la siguiente manera:
```
<ds-themed-metadata-representation-list class="ds-item-page-mixed-author-field"
[parentItem]="object"
[itemType]="'Person'"
[metadataFields]="['dc.contributor.author', 'dc.creator']"
[label]="'relationships.isAuthorOf' | translate">
</ds-themed-metadata-representation-list>

<lib-lareferencia-widget-embed [widgetType]="'lrw'"></lib-lareferencia-widget-embed>

<ds-generic-item-page-field [item]="object"
[fields]="['journal.title']"
[label]="'item.page.journal-title'">
</ds-generic-item-page-field>
```

## Configurar el o los widgets

En la carpeta "assets", necesitas crear (si no la tienes) una carpeta "data", alli deberas descargar y colocar el archivo "widget.config.json"

Descargar el archivo "widgetConfig.json" aquí.
[Descargar](src/assets/data/widget.config.json)



# Configurar 'lrw' widget

Configurar parametros en widget.config.json 
> Nota: Para configurar este widget debes editar unicamente los parametros dentro del objeto "lrw"

1. El parametro "widget_url" contiene la url, donde debera ir la ultima version.
La version tiene la forma X.Y.Z y debe ser actualizada en el parametro "widget_url"
Por ejemplo:
```
cdn.jsdelivr.net/gh/lareferencia/lrw@X.Y.Z/dist/lrw.js
```
reemplazando X.Y.Z (por ejemplo 1.1.6)

2. Donde se muestra [[expresion]] reemplazar quitando los [[]].
  
    - Nombre del nodo nacional:
Nombre que aparecerá describiendo los eventos provenientes del nodo nacional. Esto debe ser indicado por el gestor del nodo nacional.

    - Nombre del repositorio:
Nombre que aparecerá describiendo los eventos del repositorio, debe ser corto para evitar problemas de visualización.

    - country:
ISO dos digitos del país de repositorio. Ejemplos: AR,BR,ES,UY

    - Nacional source:
Identificador del agregador regional, debe consultar esta lista para obtenerlos.
Ejemplo SITEID::59

    - Repository source:
Identificador del repositorio, se forma con el prefijo OPENDOAR:: concatenado con el número identificatorio en OpenDOAR. Ejemplo: OPENDOAR::1234

3. Indentificadores
    - identifier_meta_field:
DSpace 7 agrega una meta-etiqueta "citation_abstract_url" con el contenido del metadato dc.identifier.uri.
Del contenido de este metadato debe extraerse el valor correspondiente al consecutivo del ítem.

        Por ejemplo, un repositorio que utilice el servicio handle e identifique persistentemente sus ítems de la forma "https://hdl.handle.net/[prefijoHandle]/[consecutivoDelItem]", deberá construir una expresión regular con la cual extraer este último valor colocado en la meta-etiqueta "citation_abstract_url" tras el último slash ("/").  Esta expresión regular deberá agregarse en el parámetro "identifier_regex".
        
        Otro ejemplo posible es que el contenido del metadato dc.identifier.uri sea de la siguiente forma "https://[nombreDelRepositorio]/handle/[prefijoHandle]/[consecutivoDelItem]".  De igual manera, el valor del parámetro identifier_regex debe consistir en una expresión regular que permita extraer de esta meta-etiqueta, los dígitos que proceden después del último slash ("/").

Ejemplo de configuración:
```
{
    "lareferencia-widgets": {
        "lrw": {
            "active": true,
            "widget_url": "https://cdn.jsdelivr.net/gh/lareferencia/lrw@1.1.5/dist/lrw.js",            
            "parameters":{
                "widget_div_id": "usage-stats",
                "identifier_meta_field": "citation_abstract_html_url",
                "identifier_prefix": "oai:https://repositorio.utn.ac.cr:20.500.13077/",
                "identifier_regex": "https://hdl.handle.net/[0-9\.]+/([0-9]+)/?",
                "event_labels": {  
                    "view": "Vistas",
                    "download": "Descargas",
                    "outlink": "Enlaces"
                },
                "scope_labels": {
                    "L": "LA Referencia",
                    "N": "Kímuk",
                    "R": "Repositorio UTN"
                },
                "country": "CR",
                "national_source": "SITEID::56",
                "repository_source": "OPENDOAR::4680"
            }
        }
    }
}
```

