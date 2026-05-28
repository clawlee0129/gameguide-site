'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ReplyForm } from '@/components/forum/ReplyForm';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState } from 'react';

interface ReplySectionProps {
  postId: string;
  category: string;
}

export function ReplySection({ postId, category }: ReplySectionProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [, setReplyKey] = useState(0);

  if (!isAuthenticated) {
    return (
      <>
        <div className="text-center">
          <p className="mb-3 text-sm text-gray-400">You need to sign in to reply.</p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Sign In to Reply
          </button>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </>
    );
  }

  return (
    <ReplyForm
      postId={postId}
      category={category}
      onReplyAdded={() => setReplyKey((k) => k + 1)}
    />
  );
}

// Updated: 2026-05-26 - Phase 3