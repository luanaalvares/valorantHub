import { HttpException, HttpStatus } from "@nestjs/common";

export class CharacterException extends HttpException {
    constructor() {
      super('Nome proibido', HttpStatus.FORBIDDEN);
    }
  }