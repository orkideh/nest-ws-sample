import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Server } from "socket.io";

@WebSocketGateway({
  path: "/v1/socket",
  cors: {
    origin: "*",
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("events")
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: "events", data: item }))
    );
  }

  @SubscribeMessage("identity")
  async identity(@MessageBody() data: number): Promise<number> {
    this.server.emit("message", { data, name: "keke" });
    return data;
  }
}
