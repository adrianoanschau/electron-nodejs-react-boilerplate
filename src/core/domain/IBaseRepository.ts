export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  create(data: T): Promise<T>;
}
