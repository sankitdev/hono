import { Model, FilterQuery, UpdateQuery, Document } from "mongoose";

export class BaseService<T extends Document> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async findAll(filter: FilterQuery<T> = {}) {
    return this.model.find(filter).exec();
  }
  async findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter).exec();
  }
  async create(docs: T) {
    return this.model.create(docs);
  }
  async update(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model
      .findOneAndUpdate({ filter }, update, { new: true })
      .exec();
  }
  async delete(filter: FilterQuery<T>) {
    return this.model.findOneAndDelete({ filter });
  }
}
