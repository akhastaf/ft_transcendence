import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers:[MessageGateway, MessageService]
})
export class MessageModule {}
