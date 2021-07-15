import { HttpException, HttpStatus } from '@nestjs/common';
 
class PasswordMismatch extends HttpException {
  constructor() {
    super(`please match your password with confirmation password`, HttpStatus.NOT_FOUND);
  }
}