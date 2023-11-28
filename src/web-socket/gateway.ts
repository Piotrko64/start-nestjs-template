import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common/interfaces';

@WebSocketGateway()
export class GateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connect');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    // Look postmanExample.png in /assets
    console.log(body);
    // Remember about 'onMessage' event in postman
    this.server.emit('onMessage', {
      msg: 'new',
      content: body,
    });
  }
}
