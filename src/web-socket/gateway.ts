import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class GateWay {
  @SubscribeMessage('newMEssage')
  onNewMessage(@MessageBody() body: any) {}
}
