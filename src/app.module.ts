import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [AuthModule],
  controllers: [HealthController],
})
export class AppModule {}
