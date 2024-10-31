# Lareferencia-widget-embed

Libreria generada con [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.
> Nota: Si bien el widget esta creado sobre Angular 15.2.0, el mismo carece de dependencias por lo cual deberia funcionar en cualquier versión de Angular

## Instalar en dSPACE

El primer paso es instalar (No copiar) el paquete "lareferencia-widget-embed" con el siguiente comando:
Ejecutar `npm install lareferencia-widget-embed` dentro del directorio del código fuente de angular (i.e. /dspace-angular-dspace-7.6), es decir el directorio raiz del codigo angular.

> Note: Si ves errores de dependencias puedes usar `npm install lareferencia-widget-embed --force` o intentar arreglar los errores, esta libreria solo tiene como dependecias angular/core, cualquier otro error probablemente sea de dSPACE por lo cual recomendamos utilizar --force en este caso.
De esta forma la carpeta lareferencia-widget-embed quedaría instalada dentro de dspace-angular-dspace-7.6/node_modules. Si navegas a la carpeta node_modules, deberias encontrar una carpeta llamada "lareferencia-widget-embed"

## Utilizar lareferencia-widget-embed.

Importar "lareferenciaWidgetEmbedModule" en tu proyecto dSPACE (o cualquier proyecto Angular), recomendamos importarlo en shared.module.ts en la carpeta "shared", el cual deberia encontrarse en src/app/shared/shared.module.ts. Realizar la importación de esta forma:
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
lareferenciaWidgetEmbedModule,  <--------- Aqui
];
```

De esta forma podras utilizar el componente <lib-lareferencia-widget-embed></lib-lareferencia-widget-embed> en cualquier template html lugar donde estes importanto el modulo "SharedModule".

## Elegir e insertar el widget 

Debes elegir el widget pasando el tipo [widgetType] en el componente, "lrw" para el widget que muestras las estadisticas, o "lrhw" para el widget dashboard que muestra las estadisticas del respositorio o Nodo.

Por ejemplo:
```
<lib-lareferencia-widget-embed [widgetType]="'lrw'"></lib-lareferencia-widget-embed>
o
<lib-lareferencia-widget-embed [widgetType]="'lrhw'"></lib-lareferencia-widget-embed>
```
## Insertar el widget en la vista sencilla del ítem (Para usuarios dSpace
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

Dentro de la carpeta "assets" que se encuentra dentro del proyecto angular (dentro de /src), necesitas crear una carpeta y llamarla "data". Luego deberas descargar y colocar el archivo "widget.config.json" alli dentro.

Descargar el archivo "widgetConfig.json" aquí.
[Descargar](src/assets/data/widget.config.json)

En este archivo .json encontraras todos los parametros configurables para los widgets.


# Configurar 'lrw' widget

Configurar parametros en widget.config.json 
> Nota: Para configurar este widget debes editar unicamente los parametros dentro del objeto "lrw"

1. El parametro "widget_url" contiene la url, donde debera ir la ultima version.
La version tiene la forma X.Y.Z y debe ser actualizada en el parametro "widget_url"
Por ejemplo:
```
cdn.jsdelivr.net/gh/lareferencia/lrw@X.Y.Z/dist/lrw.js
```
reemplazando X.Y.Z (por ejemplo 2.0.6) quedaria: 
```
https://cdn.jsdelivr.net/gh/lareferencia/lrw@2.0.6/dist/lrw.js
```
> Nota: solo debes modificar X.Y.Z luego de la @

2. Donde se muestra [[expresion]] reemplazar quitando los [[]]. 
Significado de cada parametro:
  
    - Nombre del nodo nacional:
Nombre que aparecerá describiendo los eventos provenientes del nodo nacional. Esto debe ser indicado por el gestor del nodo nacional.

    - Nombre del repositorio:
Nombre que aparecerá describiendo los eventos del repositorio, debe ser corto para evitar problemas de visualización.

    - country:
ISO dos digitos del país de repositorio. Ejemplos: AR,BR,ES,UY

    - Repository source:
Identificador del repositorio, se forma con el prefijo OPENDOAR:: concatenado con el número identificatorio en OpenDOAR. Ejemplo: OPENDOAR::1234

1. Configurar identifier_prefix, identifier_meta_field e identifier_regex

- DSpace le asigna a cada item depositado un "oai identifier".  Éste es un identificador único utilizado en las solicitudes OAI-PMH para extraer los metadatos del ítem. La sintaxis de dicho identificador consta de tres partes:

    1. El esquema, seguido de dos puntos (:)
    2. El identificador de espacio de nombres, seguido de un slash (/)
    3. El identificador local.

- El esquema es siempre "oai", el identificador de espacio de nombres es un nombre de dominio y el identificador local es una cadena de caracteres que identifica al elemento dentro del repositorio (en DSpace es un consecutivo numérico).

    Por ejemplo:
    ```
    oai:repositorio.utn.ac.cr:20.500.13077/403
    oai:bdigital.uexternado.edu.co:001/8734
    oai:digital.cic.gba.gob.ar:11746/6844
    ```
- El widget de estadísticas requiere de este identificador para recuperar los datos de vistas y descargas relacionados con un ítem específico, sin embargo en DSpace 7 dicho identificador no se encuentra disponible en la página del ítem, por lo tanto es necesario construirlo configurando las variables: identifier_prefix,  identifier_meta_field y identifier_regex.

1. identifier_prefix: Este valor puede consultarlo en el archivo [directorio de instalación de DSpace]/config/modules/oai.cfg en la variable oai.identifier.prefix.  También es posible consultar este valor en la interfaz OAI, específicamente como resultado de la consulta Identifiy. En http(s)://[[URL-DSpace]]/server/oai/request?verb=Identify puede observarse el "Sample identifier".

2. identifier_meta_field: DSpace 7 agrega al código fuente de la página del ítem, una meta-etiqueta "citation_abstract_url" con el contenido del metadato dc.identifier.uri. Del contenido de este metadato debe extraerse el valor correspondiente al consecutivo del ítem.  Es decir el tercer elemento del oai identifier.

3. identifier_regex: corresponde a la expresión regular necesaria para obtener el consecutivo del ítem a patir del valor contenido en la meta-etiqueta "identifier_meta_field" (que es lo mismo que el metadato dc.identifier.uri del item).

- Por ejemplo, un repositorio que utilice el servicio handle e identifique persistentemente sus ítems de la forma "https://hdl.handle.net/[prefijoHandle]/[consecutivoDelItem]", deberá construir una expresión regular con la cual extraer este último valor colocado en la meta-etiqueta "citation_abstract_url" tras el último slash ("/").

- Otro ejemplo posible es que el contenido del metadato dc.identifier.uri sea de la siguiente forma "https://[nombreDelRepositorio]/handle/[prefijoHandle]/[consecutivoDelItem]". De igual manera, el valor del parámetro identifier_regex debe consistir en una expresión regular que permita extraer de esta meta-etiqueta, los dígitos que proceden después del último slash ("/").

Ejemplo de configuración completa:
```
{
    "lareferencia-widgets": {
        "lrw": {
            "active": true,
            "widget_url": "https://cdn.jsdelivr.net/gh/lareferencia/lrw@2.0.6/dist/lrw.js",    
                    
            "parameters":{
                "widget_div_id": "usage-stats",
                "identifier_meta_field": "citation_abstract_html_url",
                "identifier_prefix": "oai:repositorio.utn.ac.cr:20.500.13077/",
                "identifier_regex": "https://hdl.handle.net/[0-9\\.]+/([0-9]+)/?",

                "scope_labels": {
                    "N": "Kímuk",
                    "R": "Repositorio UTN"
                },
                "country": "CR",
                "repository_source": "OPENDOAR::4680"
            }
        }
    }
}

```

# Configurar 'lrhw' widget.

Configurar parametros en widget.config.json 
> Nota: Para configurar este widget debes editar unicamente los parametros dentro del objeto "lrhw"

1. El parametro "widget_url" contiene la url, donde debera ir la ultima version.
La version tiene la forma X.Y.Z y debe ser actualizada en el parametro "widget_url"
Por ejemplo:
```
https://cdn.jsdelivr.net/gh/lareferencia/lrhw@1.0.8/dist/assets/chunks/historic-widget.js
```
reemplazando X.Y.Z (por ejemplo 1.0.8) quedaria: 
```
https://cdn.jsdelivr.net/gh/lareferencia/lrhw@1.0.8/dist/assets/chunks/historic-widget.js
```
> Nota: solo debes modificar X.Y.Z luego de la @

2. Donde se muestra [[expresion]] reemplazar quitando los [[]]. 
Significado de cada parametro:
  
    - repositories_list:
Lista de repositorios que queremos exhibir en el dashboard, cada repositorio tiene un parametro "label" donde colocamos el nombre, y el parametro "value" donde colocamos el source, por ejemplo "opendoar::1329", en caso de querer mostrar solo un repositorio, colocar solo uno dentro del arreglo.

    - default_repository:
El dashboard posee un selector para cambiar de repositorios en tiempo real, en este parametro colocamos el repositorio por defecto, es decir el que se va a mostrar primero al entrar por primera vez. Por otro lado si tenemos solo 1 repositorio, colocarlo aqui y tambien en "repositories_list".

    - scope_labels:
El parametro "N" hace referencia al nombre del nodo nacional al que pertenecen los repositorios. Si estas utilizando este dashboard directamente para un nodo nacional en lugar de uno o mas repositorios, dejar el parametro como "Nodo Nacional".


Ejemplo de configuración completa:
```
"lrhw": {
            "active": true,
            "widget_url": "https://cdn.jsdelivr.net/gh/lareferencia/lrhw@1.0.8/dist/assets/chunks/historic-widget.js",
            "parameters": {
                "widget_div_id": "lrhw-widget",
                "repositories_list": [
                    {
                        "label": "[[Nombre del repositorio]]",
                        "value": "opendoar::1329"
                    }
                ],
                "default_repository": {
                    "label": "[[Nombre del repositorio]]",
                    "value": "opendoar::1329"
                },
                "scope_labels": {
                    "N": "Nombre Nodo Nacional"
                }
            }
        }

```

## Modificar el widget sin re-compilar

Puedes realizar cambios en la configuracion de el o los widgets modificando el archivo widget.config.json. Para realizar dichos cambios sin tener que volver a compilar debes realizar los cambios en el archivo dentro de src/assets/data/widget.config.json y tambien dentro de la carpeta dist/server/assets/data/widget.config.json. Si no se aprecian los cambios, Puedes recargar el navegador o borrar el cache del navegador.



