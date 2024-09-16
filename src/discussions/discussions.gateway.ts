// src/discussion/discussion.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DiscussionsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private prisma: PrismaService) {}

  // Handle when a client connects
  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Load previous messages from the database
    const previousMessages = await this.prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });

    // Send previous messages to the newly connected client
    client.emit('loadPreviousMessages', previousMessages);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: { user: string, message: string }, @ConnectedSocket() client: Socket) {
    console.log('Message received:', data);

    // Save message to the database
    const savedMessage = await this.prisma.message.create({
      data: {
        user: data.user,
        content: data.message,
      },
    });

    // Broadcast the message to all clients
    this.server.emit('receiveMessage', savedMessage);
  }
}
