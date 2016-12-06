var realtimehandler;

$(function () {
    realtimehandler = $.connection.realTimeHandler;
    $.connection.hub.start();
    //添加消息
    realtimehandler.client.addMessage = function(m) {
        $("#userdiv").html($("#userdiv").html()+"<br />"+m);
    };
    //添加用户
    realtimehandler.client.addUser = function (m) {
        for (i = 0; i < m.length; i++) {
            $("#userdiv").html($("#userdiv").html() + "<br />" + m[i]);
        }
    };
    //接收消息
    realtimehandler.client.receiveMsg = function (connectionid, userid, s) {
        var clr = layersColors[layersColors.indexOf(connectionid) + 1];
        $("#messagediv").html($("#messagediv").html() + "<br /><font color='"+clr+"'>" + userid + "</font>:" + s);
    };
    //添加图层
    realtimehandler.client.addLayer = function (connectionid, clr) {
        addlayer(connectionid, clr);
        if ($.connection.hub.id == connectionid)
        {
            setcolor($.connection.hub.id,clr);
        }
    }
    //刷新用户
    realtimehandler.client.refreshUser = function refreshUser(m,c) {     
        var html="<table>";
        for (i = 0; i < m.length; i++) {
            html += "<tr><td><font  color='" + c[i] + "'>" + m[i] + "</font></td></tr>";
        }
        html += "</table>";
        $("#userdiv").html(html);
    };
    //添加面
    realtimehandler.client.addPolygon = function (id, path) {
        addPolygon(id, path);
    }
    //添加线
    realtimehandler.client.addPolyline = function (id, path) {
        addPolyline(id, path);
    }
    //添加点
    realtimehandler.client.addPoint = function (id, x, y) {
        addPoint(id, x, y);
    }
    //添加Extent
    realtimehandler.client.addExtent = function (id,json) {
        addExtent(id,json);
    }
    //清除图层
    realtimehandler.client.clear = function (id)
    {
        clear(id);
    }
    //设置用户
    realtimehandler.client.setuser = function (user)
    {
        $("#txtuser").val(user);
    }
    //信息发送按钮事件
    $("#btnsend").click(function () {
        realtimehandler.server.sendMessage($("#txtmessage").val());
        $("#txtmessage").val("");
    });
    //用户名更新
    $("#btnupdate").click(function () {
        realtimehandler.server.updateuser($("#txtuser").val());
    });

})