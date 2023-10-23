import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('Challenge EmiLabs - TalentHubConnect')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addTag('Candidates')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('candidates/api-docs', app, document);
  await app.listen(process.env.PORT);
}

main();
