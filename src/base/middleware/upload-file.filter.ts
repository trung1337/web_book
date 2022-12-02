import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

import { HttpExceptionFilter } from '@/base/middleware/http-exception.filter';
import * as HttpExc from '@/base/api/exception.reslover';

export class MulterErrorFilter extends HttpExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        if (exception.getStatus() === HttpStatus.PAYLOAD_TOO_LARGE)
            exception = new HttpExc.PayloadTooLarge({
                message: 'Data exceeds the allowed size',
            });

        super.catch(exception, host);
    }
}