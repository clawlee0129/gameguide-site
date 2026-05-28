"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

/* ── types ──────────────────────────────────────────── */

export interface Review {
  id: string;
  username: string;
  rating: number; // 1–5
  text: string;
  timestamp: number; // ms
  likes: number;
  slug: string; // which guide/game this review belongs to
}

interface ReviewDict {
  userReviews?: string;
  sort?: string;
  newest?: string;
  highest?: string;
  average?: string;
  reviews?: string;
  writeReview?: string;
  rating?: string;
  username?: string;
  reviewText?: string;
  submitReview?: string;
  noReviewsYet?: string;
  beFirst?: string;
  likes?: string;
}

interface ReviewSectionProps {
  slug: string;
  lang?: 'en' | 'zh';
  dict?: ReviewDict;
}

/* ── persistence ────────────────────────────────────── */

const STORAGE_KEY = "gameguide_reviews";

function loadReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // localStorage full or disabled — silently ignore
  }
}

/* ── sub-component: StarRating ──────────────────────── */

function StarRating({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`text-lg transition-colors ${
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
          } ${star <= rating ? "text-yellow-400" : "text-gray-600"}`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ── component ──────────────────────────────────────── */

export function ReviewSection({ slug, lang = 'en', dict = {} }: ReviewSectionProps) {
  const {
    userReviews = "User Reviews",
    sort = "Sort:",
    newest = "Newest",
    highest = "Highest",
    average = "average",
    reviews = "review",
    writeReview = "Write a Review",
    rating = "Rating",
    username = "Username",
    reviewText = "Review",
    submitReview = "Submit Review",
    noReviewsYet = "No reviews yet.",
    beFirst = "Be the first to share your thoughts!",
    likes = "likes",
  } = dict;

  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [sortMode, setSortMode] = useState<"newest" | "highest">("newest");
  const [newUsername, setNewUsername] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submitError, setSubmitError] = useState("");

  /* load on mount */
  useEffect(() => {
    setLocalReviews(loadReviews());
  }, []);

  /* filter to this slug */
  const slugReviews = useMemo(
    () => localReviews.filter((r) => r.slug === slug),
    [localReviews, slug],
  );

  /* sorted */
  const sortedReviews = useMemo(() => {
    const sorted = [...slugReviews];
    if (sortMode === "newest") {
      sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      sorted.sort((a, b) => b.rating - a.rating || b.timestamp - a.timestamp);
    }
    return sorted;
  }, [slugReviews, sortMode]);

  /* stats */
  const avgRating = useMemo(() => {
    if (slugReviews.length === 0) return 0;
    const sum = slugReviews.reduce((s, r) => s + r.rating, 0);
    return Math.round((sum / slugReviews.length) * 10) / 10;
  }, [slugReviews]);

  /* ── handlers ── */

  const handleSubmit = useCallback(() => {
    if (!newUsername.trim()) {
      setSubmitError("Please enter a username.");
      return;
    }
    if (!newText.trim()) {
      setSubmitError("Please write a review.");
      return;
    }
    setSubmitError("");
    const newReview: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      username: newUsername.trim(),
      rating: newRating,
      text: newText.trim(),
      timestamp: Date.now(),
      likes: 0,
      slug,
    };
    const updated = [...localReviews, newReview];
    setLocalReviews(updated);
    saveReviews(updated);
    setNewUsername("");
    setNewText("");
    setNewRating(5);
  }, [newUsername, newText, newRating, slug, localReviews]);

  const handleLike = useCallback(
    (id: string) => {
      const updated = localReviews.map((r) =>
        r.id === id ? { ...r, likes: r.likes + 1 } : r,
      );
      setLocalReviews(updated);
      saveReviews(updated);
    },
    [localReviews],
  );

  /* ── render ── */

  return (
    <div className="mt-12 rounded-xl border border-gray-800 bg-gray-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{userReviews}</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">{sort}</span>
          <button
            onClick={() => setSortMode("newest")}
            className={`rounded px-2 py-1 ${
              sortMode === "newest"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {newest}
          </button>
          <button
            onClick={() => setSortMode("highest")}
            className={`rounded px-2 py-1 ${
              sortMode === "highest"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {highest}
          </button>
        </div>
      </div>

      {/* average rating */}
      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={Math.round(avgRating)} />
        <span className="text-sm text-gray-400">
          {avgRating > 0 ? `${avgRating} ${average}` : noReviewsYet} &middot;{" "}
          {slugReviews.length} {slugReviews.length !== 1 ? reviews : reviews.replace(/s$/, "")}
        </span>
      </div>

      {/* review form */}
      <div className="mt-6 space-y-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
        <h3 className="text-sm font-semibold text-gray-300">{writeReview}</h3>
        <div>
          <label className="mb-1 block text-xs text-gray-500">{rating}</label>
          <StarRating
            rating={newRating}
            interactive
            onChange={(r) => setNewRating(r)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">{username}</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">{reviewText}</label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            maxLength={500}
            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
        {submitError && (
          <p className="text-xs text-red-400">{submitError}</p>
        )}
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
        >
          {submitReview}
        </button>
      </div>

      {/* review list */}
      <div className="mt-6 space-y-4">
        {sortedReviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            {noReviewsYet} {beFirst}
          </p>
        ) : (
          sortedReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border border-gray-800 bg-gray-950 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300">
                    {review.username}
                  </span>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-xs text-gray-600">
                  {new Date(review.timestamp).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                {review.text}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-800 hover:text-purple-400"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {review.likes > 0 && review.likes}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewSection;