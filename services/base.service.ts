import { Model, FilterQuery, UpdateQuery, Document } from "mongoose";

export class BaseService<T extends Document> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async findAll(filter: FilterQuery<T> = {}, limit = 10, skip = 0) {
    return this.model.find(filter).limit(limit).skip(skip).lean();
  }
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).select("+verificationCode +password");
  }
  async create(docs: Partial<T>): Promise<T> {
    return this.model.create(docs as T);
  }
  async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true });
  }
  async delete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete({ filter });
  }
}
