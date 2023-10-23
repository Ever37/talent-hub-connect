import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CandidatesController } from './candidates/candidates.controller';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidatesService } from './candidates/candidates.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CandidatesModule,
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class AppModule {}
