var mapa;
var tb;


require([//"dojo/parser",
        "esri/map",
        "dojo/on",
        "dojo/ready",
        "dojo/dom",



        "esri/geometry/Extent",
        "esri/layers/FeatureLayer",
        "esri/tasks/ServiceAreaParameters",
        "esri/tasks/ServiceAreaTask",

       
        "esri/tasks/FeatureSet",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/graphic",
        "esri/Color",
        "dojo/_base/array",
        "esri/tasks/query",



        "dijit/layout/TabContainer",
        "dijit/layout/ContentPane",
        "dijit/layout/BorderContainer",
        "dojo/domReady!"],
        function(
          Map,
          on,
          ready,
          dom,

          Extent, FeatureLayer, ServiceAreaParameters, ServiceAreaTask,

          FeatureSet, SimpleLineSymbol, SimpleFillSymbol, Graphic, Color, arrayUtils, Query
          

        ) {
    ready(function () {
      
      //parser.parse();
          
          
        mapa = new Map("map", {
          basemap: "topo",
          extent: new Extent({
            "xmax": -404589.8111149041,
            "xmin": -418233.82066378975,
            "ymax": 4928456.306348966,
            "ymin": 4918404.837129479,
            "spatialReference": {"wkid": 102100, "latestWkid": 3857}
          })

        });



        var centrosSalud;

        centrosSalud = new FeatureLayer ("https://services8.arcgis.com/BtkRLT3YBKaVGV3g/ArcGIS/rest/services/CentrosSalus/FeatureServer/0?token=hlzSejNkzLKqI4B_XIx1ZMqqrQcZfFPylTz_GNjGe9QcQA57CgCwWnB6cy4eoaHq9UoSRDa3xJz7W50lky-kgvxI5NXu_n-05ZQs0R_O1zop_zndGxhxEza6jluzP59fokfkSpbIO6hOMwWcLtZsoBKuICxV6KCDAzKBCN74koiz9wZcY8opCK-Xhr4pDAza25qGhCdIJFgTHCxDTW1GXhD_ustxpkHcKGDa2xij3PNoAq4xjQlVGZ-UJt-jOV72")


        mapa.addLayers([centrosSalud]);


        var consulta = new Query();
        consulta.where = "1=1";
        centrosSalud.selectFeatures(consulta, FeatureLayer.SELECTION_NEW, funcionresultado);


        function funcionresultado (evt) {

          var params = new ServiceAreaParameters ();
          params.defaultBreaks = [3];
          params.outSpatialReference = mapa.spatialReference;
          params.facilities = evt;
          params.returnPolygonBarriers = true;
  
  
          console.log (params)

        }
 
  
        var serviceAreaTask = new ServiceAreaTask ("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area");

        
      
        serviceAreaTask.solve(params,function(resultado){
          var polygonSymbol = new SimpleFillSymbol(
            "solid",  
            new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
            new Color([232,104,80,0.25])
          );

          arrayUtils.forEach(resultado.serviceAreaPolygons, function(serviceArea){
            serviceArea.setSymbol(polygonSymbol);
            mapa.graphics.add(serviceArea);
          })           


    });



  });

});

