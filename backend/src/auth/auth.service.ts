import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { ethers } from 'ethers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
  async verifySignature(dto: VerifyAuthDto): Promise<{ access_token: string }> {
    const { wallet_address, signature, message } = dto;

    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      if (recoveredAddress.toLowerCase() !== wallet_address.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature.');
    }

    // Issue JWT token
    const payload = { wallet_address: dto.wallet_address };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
    } catch (err) {
      throw new UnauthorizedException('Invalid signature');
    }
  }
}
