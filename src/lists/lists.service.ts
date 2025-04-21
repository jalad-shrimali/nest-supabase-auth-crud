import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListsService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async create(userId: string, dto: CreateListDto) {
    const { data, error } = await this.supabase
      .from('lists')
      .insert([{ ...dto, user_id: userId }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll(userId: string) {
    const { data, error } = await this.supabase
      .from('lists')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(userId: string, id: string) {
    const { data, error } = await this.supabase
      .from('lists')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async remove(userId: string, id: string) {
    const { error } = await this.supabase
      .from('lists')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return { message: 'List deleted successfully' };
  }
}
