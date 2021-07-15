import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule, { cors: true });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
