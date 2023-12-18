export interface LareferenciaWidgets {
    "lareferencia-widgets": LareferenciaWidgetsClass;
  }
  
  export interface LareferenciaWidgetsClass {
    lrw:  Lrw;
    lrhw: Lrhw;
  }
  
  export interface Lrhw {
    active:     boolean;
    widget_url: string;
    parameters: LrhwParameters;
  }
  
  export interface LrhwParameters {
    widget_div_id:   string;
    event_labels:    EventLabels;
    scope_labels:    ScopeLabels;
    country:         string;
    national_source: string;
  }
  
  export interface EventLabels {
    view:     string;
    download: string;
    outlink:  string;
  }
  
  export interface ScopeLabels {
    L: string;
    N: string;
    R: string;
  }
  
  export interface Lrw {
    active:     boolean;
    widget_url: string;
    parameters: LrwParameters;
  }
  
  export interface LrwParameters {
    widget_div_id:         string;
    identifier:            string;
    identifier_meta_field: string;
    identifier_prefix:     string;
    identifier_regex:      string;
    event_labels:          EventLabels;
    scope_labels:          ScopeLabels;
    country:               string;
    national_source:       string;
    repository_source:     string;
  }
  