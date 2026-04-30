import type { SupabaseProductRepository } from '@/main/repositories';

export interface IAppServices {
  products: SupabaseProductRepository;
}

declare global {
  interface IElectronAPI {
    version: string
    status: string
    invoke: <K extends keyof IAppServices, M extends keyof IAppServices[K]>(
      channel: K,
      method: M,
      ...args: IAppServices[K][M] extends (...args: infer A) => any ? A : any[]
    ) => IAppServices[K][M] extends (...args: any[]) => any
      ? Promise<Awaited<ReturnType<IAppServices[K][M]>>>
      : Promise<void>;
  }

  interface Window {
    api: IElectronAPI
  }
}

export {}
