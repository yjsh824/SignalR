<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="Scripts/jquery-1.6.4.min.js"></script>
    <script type="text/javascript" src="Scripts/jquery.signalR-2.0.3.min.js"></script>
    <script src="signalr/hubs" type="text/javascript"></script>

    <link rel="stylesheet" href="http://10.68.7.159:8080/arcgis_js_v314_sdk/arcgis_js_api/library/3.14/3.14/dijit/themes/tundra/tundra.css">
    <link rel="stylesheet" href="http://10.68.7.159:8080/arcgis_js_v314_sdk/arcgis_js_api/library/3.14/3.14/esri/css/esri.css">

    <script type="text/javascript" src="http://10.68.7.159:8080/arcgis_js_v314_sdk/arcgis_js_api/library/3.14/3.14/init.js"></script>
    <script type="text/javascript" language="javascript" src="Scripts/maphandler.js"></script>
    <script type="text/javascript" language="javascript" src="Scripts/realTimehandler.js"></script>
    <style type="text/css">
        mapdiv, divmain {
            width: 100%;
        }
    </style>


</head>
<body style="height: 100%">
    <form id="form1" runat="server">

        <table id="divmain">
            <tr>
                <td style="width: 80%;">
                    <table style="width: 100%;">
                        <tr>
                            <td >
                                <table style="position:relative;float:right;">
                                    <tr>
                                        <td>
                                            <img id="btnDrawPoint" src="img/DrawPoint.png" style="cursor: pointer" /></td>
                                        <td>
                                            <img id="btnDrawPolyline" src="img/DrawPolyline.png" style="cursor: pointer" /></td>
                                        <td>
                                            <img id="btnDrawPolygon" src="img/DrawPolygon.png" style="cursor: pointer" /></td>
                                        <td>
                                            <img id="btnDrawRectangle" src="img/DrawRectangle.png" style="cursor: pointer" /></td>
                                        <td>
                                            <img id="btnDrawFreehand" src="img/DrawFreehand.png" style="cursor: pointer" /></td>
                                        <td>&nbsp;</td>
                                        <td>
                                            <img id="btnDeleteGraphics" src="img/DeleteGraphics.png" style="cursor: pointer" />
                                        </td>
                                        <td>
                                            <img id="btnPan" src="img/i_pan.png" style="cursor: pointer" /></td>
                                        <td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="mapdiv"></div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td style="width: 20%" valign="top">
                    <table id="tabletool">
                        <tr>
                            <td style="font-size: 12px">当前用户:</td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <input type="text" id="txtuser" /></td>
                                        <td>
                                            <input type="button" id="btnupdate" value="更新" /></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="bottom">
                                <p style="font-size: 12px">当前在线用户：</p>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" id="userdiv"></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: dotted"></td>
                        </tr>
                        <tr>
                            <td style="font-size: 12px">即时消息：
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <input type="text" id="txtmessage" /></td>
                                        <td>
                                            <input type="button" id="btnsend" value="发送" /></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="messagediv" style="font-size: 10px">
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
