import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGuide extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gameId: string;
  gameSlug: string;
  gameTitle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  timeToComplete: number;
  sections: {
    title: string;
    content: string;
    order: number;
    images?: string[];
    tips?: string[];
    warnings?: string[];
  }[];
  tags: string[];
  metaDescription: string;
  metaKeywords: string[];
  author: string;
  published: boolean;
  views: number;
  likes: number;
  publishedAt: Date;
  updatedAt: Date;
}

const GuideSectionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true },
    images: [String],
    tips: [String],
    warnings: [String],
  },
  { _id: false }
);

const GuideSchema = new Schema<IGuide>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 320 },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    gameId: { type: String, required: true, index: true },
    gameSlug: { type: String, required: true, index: true },
    gameTitle: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate',
    },
    timeToComplete: { type: Number, default: 10 },
    sections: { type: [GuideSectionSchema], default: [] },
    tags: { type: [String], default: [], index: true },
    metaDescription: { type: String, required: true, maxlength: 160 },
    metaKeywords: { type: [String], default: [] },
    author: { type: String, default: 'GameGuide Team' },
    published: { type: Boolean, default: false, index: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Text index for search
GuideSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

// Compound indexes for common queries
GuideSchema.index({ gameSlug: 1, publishedAt: -1 });
GuideSchema.index({ published: 1, publishedAt: -1 });

export const Guide: Model<IGuide> =
  mongoose.models.Guide || mongoose.model<IGuide>('Guide', GuideSchema);