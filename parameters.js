var parameters = {
        "id":"app",
        //"width":"",
        "height":"500",
        "prerelease":false,
        "showToolBar":false,
        "borderColor":null,
        "showMenuBar":false,
        "showAlgebraInput":false,
		"showResetIcon":false,
        "enableLabelDrags":false,
        "enableShiftDragZoom":false,
        "enableRightClick":false,
        "capturingThreshold":null,
        "showToolBarHelp":false,
		"errorDialogsActive":true,
        "useBrowserForJS":true,
        //"scaleContainerClass":"ggb",
        //"allowUpscale": true;
};

var applet = new GGBApplet('5.0', parameters);
          
window.onload = function() {
        applet.inject('applet_container');
} 
