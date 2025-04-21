// src/supabase/supabase.module.ts
import { Global, Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (config: ConfigService) => {
        return createClient(
          config.get('SUPABASE_URL') || '',
          config.get('SUPABASE_ANON_KEY') || '',
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
