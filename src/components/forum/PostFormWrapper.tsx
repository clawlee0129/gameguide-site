'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { PostForm } from '@/components/forum/PostForm';

interface PostFormWrapperProps {
  category: string;
}

export function PostFormWrapper({ category }: PostFormWrapperProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
        >
          New Post
        </button>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </>
    );
  }

  if (showPostForm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
          <PostForm category={category} onClose={() => setShowPostForm(false)} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowPostForm(true)}
      className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
    >
      New Post
    </button>
  );
}

// Updated: 2026-05-26 - Phase 3