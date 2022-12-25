import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { SocketWithUser, SocketWithUserId } from "src/types";
import { UserService } from "src/user/user.service";

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {}