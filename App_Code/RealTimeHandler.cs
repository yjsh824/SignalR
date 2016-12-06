using System;
using System.Collections.Generic;
using System.Web;
using System.Threading.Tasks;
namespace SingnalR
{
    /// <summary>
    /// RealTimeHandler 的摘要说明
    /// </summary>
    public class RealTimeHandler : Microsoft.AspNet.SignalR.Hub
    {
        public static Dictionary<String, String> _usernames = new Dictionary<string, string>();
        public static Dictionary<String, String> _legends = new Dictionary<string, string>();
        public static int _index = 0;
        public static List<string> _Colors = new List<string>() { "red", "blue", "green", "black", "grey", "purple", "fuchsia", "silver", "lime", "olive", "yellow", "navy", "teal", "aqua", "maroon" };

        public RealTimeHandler()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
        }
        /// <summary>
        /// 用户连接时触发
        /// </summary>
        /// <returns></returns>
        public override System.Threading.Tasks.Task OnConnected()
        {
            String connectionid = Context.ConnectionId;

            foreach (String key in _legends.Keys)
            {
                Clients.Caller.addLayer(key, _legends[key]);
            }
            String username="user" + (++_index);
            _usernames.Add(connectionid, username);
            Clients.Caller.setuser(username);
            String color;
            lock (_Colors)
            {
                color = _Colors[0];
                _legends.Add(connectionid, _Colors[0]);
                _Colors.RemoveAt(0);
            }
            Clients.All.addLayer(connectionid, color);

            refreshusers();
            return base.OnConnected();
        }
        /// <summary>
        /// 更新客户端用户列表
        /// </summary>
        private void refreshusers()
        {
            String[] users = new String[_usernames.Count];
            String[] legends = new String[_usernames.Count];
            String[] keys = new String[_usernames.Count];
            _usernames.Keys.CopyTo(keys, 0);
            for (int i = 0; i < keys.Length; i++)
            {
                users[i] = _usernames[keys[i]];
                legends[i] = _legends[keys[i]];
            }

            Clients.All.refreshUser(users, legends);
        }
        /// <summary>
        /// 用户断开时触发
        /// </summary>
        /// <returns></returns>
        public override Task OnDisconnected()
        {
            _usernames.Remove(Context.ConnectionId);
            _Colors.Add(_legends[Context.ConnectionId]);
            _legends.Remove(Context.ConnectionId);
            refreshusers();

            return base.OnDisconnected();
        }
        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="str"></param>
        public void SendMessage(String str)
        {
            Clients.All.receiveMsg(Context.ConnectionId,_usernames[Context.ConnectionId], str);
        }
        /// <summary>
        /// 绘制线
        /// </summary>
        /// <param name="paths"></param>
        public void AddPolyline(double[][][] paths)
        {
            Clients.All.addPolyline(Context.ConnectionId, paths);
        }
        /// <summary>
        /// 绘制Extent
        /// </summary>
        /// <param name="json"></param>
        public void AddExtent(String json)
        {
            Clients.All.addExtent(Context.ConnectionId, json);
        }
        /// <summary>
        /// 绘制面
        /// </summary>
        /// <param name="paths"></param>
        public void AddPolygon(double[][][] paths)
        {
            Clients.All.addPolygon(Context.ConnectionId, paths);

        }
        /// <summary>
        /// 绘制点
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        public void AddPoint(double x, double y)
        {
            Clients.All.addPoint(Context.ConnectionId, x, y);
        }
        /// <summary>
        /// 清除图层
        /// </summary>
        public void Clear()
        {
            Clients.All.clear(Context.ConnectionId);
        }
        /// <summary>
        /// 更新用户名
        /// </summary>
        /// <param name="user"></param>
        public void updateuser(String user) {
            _usernames[Context.ConnectionId] = user;
            refreshusers();
        }
    }
}