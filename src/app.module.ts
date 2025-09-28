import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env';
import { User } from './entity/user.entity';
import { UserModule } from './module/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: env.DB_HOST,
        port: env.DB_PORT,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        migrationsRun: env.NODE_ENV === 'development',
        synchronize: true,
        logging: env.NODE_ENV === 'development',
        entities: [__dirname + '/entity/*.entity{.ts,.js}'],
      })
    },
    ),
    TypeOrmModule.forFeature([User,]),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
