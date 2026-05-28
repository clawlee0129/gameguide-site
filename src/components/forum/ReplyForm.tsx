'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ReplyFormProps {
  postId: string;
  category: string;
  onReplyAdded?: () => void;
}

export function ReplyForm({ postId, category, onReplyAdded }: ReplyFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Get existing forum posts
      const postsStr = localStorage.getItem('ggp_forum_posts');
      const posts = postsStr ? JSON.parse(postsStr) : [];

      // Find the post
      const postIndex = posts.findIndex((p: any) => p.id === postId);

      // Also try to get from in-memory (initial data)
      const newReply = {
        id: `reply-${postId}-${Date.now()}`,
        postId,
        content: content.trim(),
        author: user.username,
        authorId: user.id,
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      if (postIndex !== -1) {
        // Update existing post in localStorage
        posts[postIndex].replies = [...(posts[postIndex].replies || []), newReply];
        localStorage.setItem('ggp_forum_posts', JSON.stringify(posts));
      } else {
        // Store reply separately if post is from initial data
        const repliesStr = localStorage.getItem('ggp_forum_replies');
        const replies = repliesStr ? JSON.parse(repliesStr) : [];
        replies.push(newReply);
        localStorage.setItem('ggp_forum_replies', JSON.stringify(replies));
      }

      setContent('');
      onReplyAdded?.();
    } catch (err) {
      console.error('Failed to add reply:', err);
      setError('Failed to add reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        rows={3}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Posting as <span className="font-medium text-purple-400">{user?.username}</span>
        </span>
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Reply'}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </form>
  );
}

// Updated: 2026-05-26 - Phase 3