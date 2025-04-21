import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('No token provided');
    const token = authHeader.split(' ')[1];

    const { data: user, error } = await this.supabase.auth.getUser(token);

    if (error || !user?.user) {
      throw new UnauthorizedException('Invalid token');
    }

    request['user'] = user.user; // `user.user.id` = user_id
    return true;
  }
}
