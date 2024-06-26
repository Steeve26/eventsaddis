import { Document, Schema, Types, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description? : string;
  location? : string;
  createdAt: Date;
  imageUr1: string;
  startDateTime: Date;
  endDateTime: Date;
  price? : string;
  isFree: boolean;
  url?: string;
  category: { _id: string, name: string};
  organizer: Types .ObjectId | string;
}

const EventSchema = new Schema({
  title: { type: String, requried: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, requried: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Event = models.Event || model('Event', EventSchema);

export default Event;