import { supabase } from '@/main/app/services/supabase'
import { IBaseRepository } from '@/core/domain/IBaseRepository'

export class SupabaseProductRepository implements IBaseRepository<any> {

  async getAll() {
    const { data, error } = await supabase.from('products').select('*')
    if (error) throw new Error(error.message)
    return data as string[]
  }

  async create(product: any) {
    const { data, error } = await supabase.from('products').insert(product).select()
    if (error) throw new Error(error.message)
    return data[0]
  }
}
