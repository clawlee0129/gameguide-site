import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGame extends Document {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  releaseDate: Date;
  platforms: string[];
  genres: string[];
  developer: string;
  publisher: string;
  metacriticScore?: number;
  rawgId?: number;
  guideCount: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGame>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    coverImage: { type: String, default: '' },
    screenshots: { type: [String], default: [] },
    releaseDate: { type: Date, required: true },
    platforms: { type: [String], required: true },
    genres: { type: [String], required: true, index: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    metacriticScore: { type: Number, min: 0, max: 100 },
    rawgId: { type: Number, sparse: true },
    guideCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

GameSchema.index({ title: 'text', description: 'text' });
GameSchema.index({ metacriticScore: -1 });
GameSchema.index({ guideCount: -1 });

export const Game: Model<IGame> =
  mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);