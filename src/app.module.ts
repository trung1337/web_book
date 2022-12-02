import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoggingModule} from "@/base/logging/logging.module";

const appModule = [UserModule, BookModule]
const baseModule = [LoggingModule]
@Module({
  imports: [
      ...baseModule,
      ...appModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'peanut.db.elephantsql.com',
      // port: 6666,
      username: 'euumpsxt',
      password: 'k1zpxeEcD3WkEnTEjdxaN0cykX5e4wAV',
      database: 'euumpsxt',
      entities: ['dist/**/*.{js, ts}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
