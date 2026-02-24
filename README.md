# Lareferencia-widget-embed

Librería generada con [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.0.

> **Nota:** Si bien el widget está creado sobre Angular 15.2.0, el mismo carece de dependencias por lo cual debería funcionar en cualquier versión de Angular.
>
> **Nota:** En el apartado "Configurar lrw widget" se encuentra todo lo necesario para configurar el widget que muestra estadísticas del ítem y en el apartado "Configurar lrhw widget" se encuentra lo necesario para configurar el widget que muestra estadísticas de el o los repositorios.

---

## 1. Instalación en dSPACE o proyecto Angular
La instalacion es un poco diferente a partir de DSpace 8 (ver mas abajo).

El primer paso es instalar el paquete `lareferencia-widget-embed` con el siguiente comando:

Ejecutar dentro del directorio raíz del código fuente de angular (ej. `/dspace-angular`):
```bash
npm install lareferencia-widget-embed DSpace 7 y 9)
yarn install lareferencia-widget-embed (DSpace 8)
```

> **Nota:** Si ves errores de dependencias puedes usar `npm/yarn install lareferencia-widget-embed --force`. Esta librería solo tiene como dependencias `@angular/core`, cualquier otro error probablemente sea de discrepancias en la versión de dSPACE.
> Al finalizar, deberías encontrar la carpeta `lareferencia-widget-embed` dentro de `node_modules`.

---

## 2. Configuración e Integración

Dependiendo de tu versión de DSpace, la forma de importar el módulo varía:

### DSpace 7 (Uso de Módulos)
En DSpace 7 se recomienda importar `lareferenciaWidgetEmbedModule` en el archivo `shared.module.ts` (ubicado generalmente en `src/app/shared/shared.module.ts`).

```typescript
import { lareferenciaWidgetEmbedModule } from 'lareferencia-widget-embed';

const MODULES = [
  // ... otros módulos
  lareferenciaWidgetEmbedModule,
];
```

De esta forma podrás utilizar el componente `<lib-lareferencia-widget-embed></lib-lareferencia-widget-embed>` en cualquier template HTML donde estés importando el módulo `SharedModule`.

### DSpace 8 en adelante (Uso de Standalone Components)
A partir de DSpace 8, los componentes son **Standalone**. Esto significa que debes importar el módulo directamente en el arreglo `imports` de cada componente donde desees utilizarlo. (por ejemplo publication.component.ts)
>recuerda colocar standalone: true,

```typescript
import { lareferenciaWidgetEmbedModule } from 'lareferencia-widget-embed';

@Component({
  // ...
  standalone: true,
  imports: [
    // ... otros módulos y componentes
    lareferenciaWidgetEmbedModule,
  ],
})
export class MiComponente { }
```

---

## 3. Elegir e insertar el widget

Debes elegir el widget pasando el tipo `[widgetType]` en el componente:
- `"lrw"`: Para el widget que muestra las estadísticas del ítem.
- `"lrhw"`: Para el widget dashboard que muestra las estadísticas del repositorio o Nodo.

**Ejemplo de inserción:**
```html
<lib-lareferencia-widget-embed [widgetType]="'lrw'"></lib-lareferencia-widget-embed>
<!-- o -->
<lib-lareferencia-widget-embed [widgetType]="'lrhw'"></lib-lareferencia-widget-embed>
```

### Insertar en la vista sencilla del ítem (Para usuarios dSpace)
Las plantillas para modificar la vista sencilla se encuentran en: `[temaHabilitado]/item-page/simple/item-types`.

- **Para entidad tipo Publicación:** Editar `item-page/simple/item-types/publication/publication.component.html`.
- **Para ítem regular (Untyped):** Editar `item-page/simple/item-types/untyped-item/untyped-item.component.html`.

**Ejemplo (luego del listado de autores):**
```html
<ds-themed-metadata-representation-list 
  class="ds-item-page-mixed-author-field"
  [parentItem]="object"
  [itemType]="'Person'"
  [metadataFields]="['dc.contributor.author', 'dc.creator']"
  [label]="'relationships.isAuthorOf' | translate">
</ds-themed-metadata-representation-list>

<lib-lareferencia-widget-embed [widgetType]="'lrw'"></lib-lareferencia-widget-embed>
```

---

## 4. Configuración vía widget.config.json

Dentro de la carpeta `src/assets`, crea una carpeta llamada `data` y coloca allí el archivo `widget.config.json`.

[Descargar archivo base widgetConfig.json](src/assets/data/widget.config.json)

---

## 5. Configurar 'lrw' widget (Estadísticas del ítem)

Edita únicamente los parámetros dentro del objeto `"lrw"` en el JSON:

1.  **widget_url**: URL del CDN. Reemplaza `X.Y.Z` por la versión deseada (ej. `2.0.6`).
    ```
    https://cdn.jsdelivr.net/gh/lareferencia/lrw@2.0.6/dist/lrw.js
    ```
2.  **identifier_prefix**: Valor consultado en `oai.cfg` o vía consulta `Identify`. Ej: `oai:repositorio.utn.ac.cr:20.500.13077/`.
3.  **identifier_meta_field**: Generalmente `citation_abstract_html_url` (basado en `dc.identifier.uri`).
4.  **identifier_regex**: Expresión regular para extraer el identificador local (ej: `https://hdl.handle.net/[0-9\\.]+/([0-9]+)/?`).
5.  **Otros parámetros**: `scope_labels` (Nombres para Nodo y Repositorio), `country` (ISO 2 dígitos), y `repository_source` (id OpenDOAR).

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


---

## 6. Configurar 'lrhw' widget (Dashboard)

Edita únicamente los parámetros dentro del objeto `"lrhw"` en el JSON:

1.  **widget_url**: URL del CDN (ej. `https://cdn.jsdelivr.net/gh/lareferencia/lrhw@1.0.8/dist/assets/chunks/historic-widget.js`).
2.  **repositories_list**: Lista de repositorios con `label` y `value` (sourceid).
3.  **default_repository**: Repositorio que se muestra por defecto.
4.  **scope_labels**: Nombre del nodo nacional ("N").

### Configuración directa en el componente (Alternativa)
Puedes pasar la configuración directamente como inputs del componente, exceptuando la URL del CDN que debe estar en el JSON.

```html
<lib-lareferencia-widget-embed 
    [widgetType]="'lrhw'" 
    [node_name]="'Nombre Nodo'"
    [repositories_list]="[{label:'Repo A', value:'opendoar::1234'}]"
    [default_repository]="{label:'Repo A', value:'opendoar::1234'}"
></lib-lareferencia-widget-embed>
```

---
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

## 7. Modificar sin re-compilar

Puedes realizar cambios en la configuración modificando el archivo `widget.config.json` tanto en:
- `src/assets/data/widget.config.json` (para persistencia)
- `dist/server/assets/data/widget.config.json` (para ver los cambios en tiempo real sin recompilar el bundle)

Si no se aprecian los cambios, recarga el navegador o borra la caché.
