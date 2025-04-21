import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async signUp(email: string, password: string, full_name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const user = data.user;

    // Insert into users table (optional)
    if (user) {
      await this.supabase.from('users').insert({
        id: user.id,
        full_name,
      });
    }

    return {
      message: 'Signup successful. Please confirm your email.',
      user: data.user,
    };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      throw new UnauthorizedException(error?.message || 'Invalid credentials');
    }

    return {
      access_token: data.session.access_token,
      user: data.user,
    };
  }
}
