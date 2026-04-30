import { SupabaseProductRepository } from "../app/repositories";

export const serviceRegistry = {
  products: new SupabaseProductRepository(),
} as const;