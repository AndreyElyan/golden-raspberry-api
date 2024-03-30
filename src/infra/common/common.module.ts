import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class CommonModule {}
