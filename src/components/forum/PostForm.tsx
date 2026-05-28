'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PostFormProps {
  category: string;
  onClose: () => void;
}

export function PostForm({ category, onClose }: PostFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Get existing posts
      const existingPostsStr = localStorage.getItem('ggp_forum_posts');
      const existingPosts = existingPostsStr ? JSON.parse(existingPostsStr) : [];

      // Create new post
      const newPost = {
        id: `post-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        author: user.username,
        authorId: user.id,
        category,
        createdAt: new Date().toISOString(),
        replies: [],
        views: 0,
        likes: 0,
      };

      // Save to localStorage
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem('ggp_forum_posts', JSON.stringify(updatedPosts));

      // Navigate to the new post
      onClose();
      router.push(`/forum/${category}/${newPost.id}`);
      router.refresh();
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Create New Post</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="post-title" className="mb-1 block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title for your post"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            maxLength={200}
          />
          <p className="mt-1 text-xs text-gray-500">{title.length}/200 characters</p>
        </div>

        <div>
          <label htmlFor="post-content" className="mb-1 block text-sm font-medium text-gray-300">
            Content
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here. You can include details, questions, or discussion points."
            rows={8}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Posting in: <span className="font-medium text-purple-400">{category}</span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Create Post'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-900/20 px-3 py-2">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3