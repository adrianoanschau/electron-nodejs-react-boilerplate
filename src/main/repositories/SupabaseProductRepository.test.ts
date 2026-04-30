import { describe, it, expect, vi } from 'vitest'
import { SupabaseProductRepository } from './SupabaseProductRepository'

describe('SupabaseProductRepository', () => {
  it('deve buscar todos os produtos com sucesso', async () => {
    const repo = new SupabaseProductRepository()
    
    const products = await repo.getAll()
    
    expect(Array.isArray(products)).toBe(true)
  })

  it('deve falhar ao tentar criar um produto inválido', async () => {
    const repo = new SupabaseProductRepository()
    const invalidProduct = { preco: -10 }
    
    await expect(repo.create(invalidProduct)).rejects.toThrow()
  })
})
