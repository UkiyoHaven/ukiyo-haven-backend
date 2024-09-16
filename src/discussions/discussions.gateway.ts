import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';

  @WebSocketGateway({
    cors: {
      origin: '*',  // Allow connections from any origin (you may want to restrict this)
    },
  })
  export class DiscussionsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
      console.log('Socket.IO server initialized');
    }

    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    handleSendMessage(@MessageBody() data: { user: string, message: string }, @ConnectedSocket() client: Socket) {
      console.log('Message received:', data);
      // Broadcast the message to all connected clients
      this.server.emit('receiveMessage', data);
    }
  }
