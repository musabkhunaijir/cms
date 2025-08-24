import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContentModule } from './features/content/content.module';
import { CategoriesModule } from './features/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        logging: true,
        //TODO: use only in DEV
        synchronize: true,
        //TODO: for DEV purposes
        // dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    ContentModule,
    CategoriesModule,
  ],
})
export class AppModule {}
