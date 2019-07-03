import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function bootstrap(port?: number) {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  if (!port) {
    port = +process.env.port || 3333;
  }
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
