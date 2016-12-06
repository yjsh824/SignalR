dojo.require("esri.map");
dojo.require("esri.layers.ArcGISTiledMapServiceLayer");
dojo.require("esri.SpatialReference");
dojo.require("esri.InfoTemplate");
dojo.require("esri.toolbars.draw");
dojo.require("esri.layers.GraphicsLayer");
dojo.require("esri.geometry.Point");
dojo.require("esri.geometry.Polyline");
dojo.require("esri.geometry.Polygon");
dojo.require("esri.graphic");
dojo.require("esri.symbols.SimpleMarkerSymbol");
dojo.require("esri.symbols.SimpleLineSymbol");
dojo.require("esri.symbols.SimpleFillSymbol");
dojo.require("esri.Color");
dojo.require("dijit.registry");
dojo.require("dojo.parser");
dojo.require("dijit.form.Button");
//绘图工具
var tb;
var map;
//当前用户的connectid
var currentid;
//connectid与color的记录表，例如：[user1,red,user2,blue,user3,yellow]
var layersColors = [];
/**
*初始化地图
*/
function initmap() {
    map = new esri.Map("mapdiv", {
        center: [-25.312, 34.307],
        logo: false,
        zoom: 3
    });
    var street = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
    map.addLayer(street);
    tb = new esri.toolbars.Draw(map);
    tb.on("draw-end", addGraphic);
}
/**
*绘制点
*/
function addPoint(connectid, x, y) {
    var clr = layersColors[layersColors.indexOf(connectid) + 1];
    var symbol = new esri.symbol.SimpleMarkerSymbol();
    symbol.setColor(new esri.Color(clr));
    symbol.color.a = 0.5;
    var layer = map.getLayer(connectid);
    var p = new esri.geometry.Point(x, y, map.spatialReference);
    layer.add(new esri.Graphic(p, symbol));
}
/**
*绘制线
*/
function addPolyline(connectid, paths) {
    var line = new esri.geometry.Polyline(map.spatialReference);
    line.paths = paths;
    var gLayer = map.getLayer(connectid);
    var symbol = new esri.symbol.SimpleLineSymbol();
    var clr = layersColors[layersColors.indexOf(connectid) + 1];
    symbol.setColor(new esri.Color(clr));
    symbol.color.a = 0.5;
    gLayer.add(new esri.Graphic(line, symbol));
}
/**
*绘制面
*/
function addPolygon(connectid, paths) {
    var line = new esri.geometry.Polygon(map.spatialReference);
    line.rings = paths;
    var gLayer = map.getLayer(connectid);
    var symbol = new esri.symbol.SimpleFillSymbol();
    var clr = layersColors[layersColors.indexOf(connectid) + 1];
    symbol.setColor(new esri.Color(clr));
    symbol.color.a = 0.5;
    gLayer.add(new esri.Graphic(line, symbol));
}

/**
*绘制Extent
*/
function addExtent(connectid, json) {
    var line = new esri.geometry.Extent($.parseJSON( json));
   
    var gLayer = map.getLayer(connectid);
    var symbol = new esri.symbol.SimpleFillSymbol();
    var clr = layersColors[layersColors.indexOf(connectid) + 1];
    symbol.setColor(new esri.Color(clr));
    symbol.color.a = 0.5;
    gLayer.add(new esri.Graphic(line, symbol));
}
/**
*绘制工具绘制结束后触发
*/
function addGraphic(evt) {
    var geometry = evt.geometry;
    var type = geometry.type;
    if (type === "point" || type === "multipoint") {
        realtimehandler.server.addPoint(geometry.x, geometry.y);
    }
    else if (type === "line" || type === "polyline") {
        realtimehandler.server.addPolyline(geometry.paths);
    }
    else if (type === "polygon") {
        realtimehandler.server.addPolygon(geometry.rings);
    }
    else if (type === "extent") {
        realtimehandler.server.addExtent(JSON.stringify(geometry.toJson()));
    }

}
/**
*初始化按钮事件
*/
function initbtn() {
    $("img").click(function (btn) {
        activateTool(btn.currentTarget.id);
    });
}
/**
*激活按钮事件
*/
function activateTool(tool) {
    switch (tool) {
        case "btnDrawPoint":
            tool = "POINT";
            break;
        case "btnDrawPolyline":
            tool = "POLYLINE";
            break;
        case "btnDrawPolygon":
            tool = "POLYGON";
            break;
        case "btnDrawRectangle":
            tool = "EXTENT";
            break;
        case "btnPan":
            tb.deactivate();
            return;
        case "btnDrawFreehand":
            tool = "FREEHAND_POLYLINE";
            break;
        case "btnDeleteGraphics":
            console.log("btnDeleteGraphics");
            realtimehandler.server.clear();
            return;
        default:
            return;
    }

    tb.activate(esri.toolbars.Draw[tool]);
}
/**
*清除某个connectid的图层内容
*/
function clear(id)
{
    console.log(id);
    map.getLayer(id).clear();
}
/**
*当地图加载完时运行
*/
$(function () {
    $("#mapdiv").height($(document).height() - 20);
    $("#mapdiv").width($(document).width() * 0.8);
    $("#tabletool").width($(document).width() * 0.2);
    dojo.ready(initmap);
    initbtn();
})
/*
*有新用户时，添加图层
*/
function addlayer(connectionid, color) {
    var graphiclayer = new esri.layers.GraphicsLayer();
    graphiclayer.id = connectionid;
    map.addLayer(graphiclayer);
    layersColors.push(connectionid);
    layersColors.push(color);
}
/*
*设置绘图工具的绘制颜色
*/
function setcolor(cid,clr) {
    currentid = cid;
    // Point symbol
    var symbol = new esri.symbol.SimpleMarkerSymbol();
    symbol.setColor(new esri.Color(clr));
    tb.markerSymbol = symbol;

    // Line symbol
    symbol = new esri.symbol.SimpleLineSymbol();
    symbol.setColor(new esri.Color(clr));
    tb.lineSymbol = symbol;


    symbol = new esri.symbol.SimpleFillSymbol();
    symbol.setColor(new esri.Color(clr));
    tb.fillSymbol = symbol;
}