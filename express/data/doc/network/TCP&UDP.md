    # UDP

特点：

1. UDP是**无连接**的
2. UDP使用**最大努力交付**，因此主机不需要维持复杂的连接状态表
3. UDP是**面向报文**的
4. UDP**没有拥塞控制**。 网络出现的拥塞不会使源主机的发送速率降低。很多实时应用（视频会议）要求主机以恒定的速率发送数
   据，允许在网络发生拥塞的时丢失**少部分**数据，
5. UDP支持**一对一，一对多，多对一，多对多**的交互通信
6. UDP**头部开销小**。

# TCP

特点：

1. TCP是**面向连接的协议**,即使用TCP协议前需要建立连接
2. TCP只能有两个端点，说明TCP只能是**点对点的**
3. TCP提供可靠交付服务。 无差错，不丢失，不重复，并且按序到达
4. TCP提供全双工通信。
5. 面向字节流

## 三次握手：

-   客户端通过 SYN 报文段发送连接请求，确定服务端是否开启端口准备连接。状态设置为 SYN_SEND;
-   服务器如果有开着的端口并且决定接受连接，就会返回一个 SYN+ACK 报文段给客户端，状态设置为 SYN_RECV；
-   客户端收到服务器的 SYN+ACK 报文段，向服务器发送 ACK 报文段表示确认。此时客户端和服务器都设置为 ESTABLISHED 状态。连
    接建立，可以开始数据传输了。<br> i. 客户端：你能接收到我的消息吗？<br> ii. 服务端：可以的，那你能接收到我的回复
    吗？<br> iii. 客户端：可以，那我们开始聊正事吧<br>

![a7d94c9381ee6db6478f42c4f35ecc8.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f575f5f4b07a419e885467d75c398ab1~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a04f0c0761634b29a3919188583ecc5c~tplv-k3u1fbpfcp-watermark.image?)

**为什么是3次？**：避免历史连接，确认客户端发来的请求是这次通信的人。确认双方的发送和接收功能都正常为什么不是4次？：3次
够了第四次浪费

## 四次挥手

-   客户端向服务端发出释放连接报文，并且停止发送数据
-   服务器接收到连接释放报文后，发出确认报文
-   服务器把最后的信息发送完毕后就向客户端发送连接释放报文
-   客户端收到服务器的连接释放报文后，必须发出确认; 客户端此时状态：TIME_WAIT 服务器端状态 : CLOSED
-   客户端状态 : 原地驻足2MSL（俩次交谈响应时间） -> CLOSED

**为什么多一次挥手？**: 因为第一次挥是确认收到，第二次挥是确认数据发完了。 **为什么驻足2MSL**:因为最后一个ACK报文可能会
丢失。服务器会重传一遍FIN+ACK报文，而A就能在2MSL里收到，并且重启2MSL这个时间，最后两个端都为closed状态。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f3b5b4d9587491bb45c0ebd3e4204d9~tplv-k3u1fbpfcp-watermark.image?)

## TCP/UDP 传输层协议

-   TCP 面向连接，字节流传输，追求的是可靠无差错的交付，单播。开销大，头部字段多
-   UDP是无连接的，报文传输，追求的是最大努力交付，单播，多播，广播。实时性比较好
