import { Document, Model, Schema, model } from "mongoose";

export interface ContactDocument extends Document {
  name: {
    first: string;
    last?: string;
  };
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  phone: string;
  email?: string;
  notes?: string;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  belongsTo?: string;
}

export const ContactSchema = new Schema<ContactDocument>(
  {
    name: {
      first: { type: String, required: true, trim: true },
      last: { type: String, trim: true },
    },
    address: {
      line1: { type: String, trim: true },
      line2: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number"],
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Invalid email address"],
    },
    notes: { type: String },
    favorite: { type: Boolean, default: false },
    belongsTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const ContactModel: Model<ContactDocument> = model<ContactDocument>(
  "Contact",
  ContactSchema
);
