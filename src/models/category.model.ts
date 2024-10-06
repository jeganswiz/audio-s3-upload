import { Document, model, Schema } from "mongoose";

export interface IVoicememo extends Document {
  notes: string;
  image: string;
  userId: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VoicememoSchema: Schema = new Schema(
  {
    notes: { type: String, required: true },
    file: { type: String, required: true },
    userId: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  { collection: "voicememos", timestamps: true }
);

const Voicememo = model<IVoicememo>("Voicememo", VoicememoSchema);

export default Voicememo;
