import { createBootstrapOptions } from '@libs/bootstrap';
import { APP_CONFIG, AppConfigReturnType, NodeEnv, SYSTEM_CONFIG, SystemConfigReturnType } from '@libs/configs';
import { WinstonLogger } from '@libs/logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = WinstonLogger.create('stream');
  const app = await NestFactory.create(AppModule, { logger });

  const config = app.get(ConfigService);
  const appConfig = config.get<AppConfigReturnType>(APP_CONFIG);
  const systemConfig = config.get<SystemConfigReturnType>(SYSTEM_CONFIG);

  if (systemConfig.env === NodeEnv.Local) {
    console.log('todo - create async api docs');
  }

  const bootstrapOptions = createBootstrapOptions(app);

  app.enableShutdownHooks();
  app.enableCors(appConfig.corsOptions);
  app.useGlobalPipes(...bootstrapOptions.pipes);
  app.useGlobalFilters(...bootstrapOptions.filters);
  app.useGlobalInterceptors(...bootstrapOptions.interceptors);

  await app.listen(appConfig.port);
}

bootstrap();
