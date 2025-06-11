import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetWallet = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.wallet_address;
  },
);
