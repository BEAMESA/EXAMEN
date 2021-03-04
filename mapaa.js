var mapa;
var tb;


require(["esri/map",
        "dojo/on",
        "dojo/ready",
        "dojo/dom",


        

        "dijit/layout/TabContainer",
        "dijit/layout/ContentPane",
        "dijit/layout/BorderContainer",
        "dojo/domReady!"],
        function(
          Map,
          on,
          ready,
          dom,

          

        ) {
    ready(function () {        
          
          
        mapa = new Map("map", {
          basemap: "topo",
          extent: new Extent({
            "xmax": -7760707.875336144,
            "xmin": -19501435.419936094,
            "ymax": 9690521.387028327,
            "ymin": -602183.0937376302,
            "spatialReference": {"wkid": 102100, "latestWkid": 3857}
          })

        });






        


    });
          



}); 

    

    
