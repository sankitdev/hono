import { model, Schema } from "mongoose";

interface ICentralBank extends Document {
  totalSupply: number;
  circulatingSupply: number;
  lastUBIDistribution?: Date;
}

const centralBankSchema = new Schema<ICentralBank>(
  {
    totalSupply: { type: Number, required: true, default: 100000 },
    circulatingSupply: { type: Number, required: true, default: 0 },
    lastUBIDistribution: { type: Date, default: null },
  },
  { timestamps: true }
);

const CentralBankModel = model<ICentralBank>("CentralBank", centralBankSchema);
export { CentralBankModel, ICentralBank };
