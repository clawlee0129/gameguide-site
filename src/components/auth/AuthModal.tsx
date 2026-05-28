'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFormErrors({});
    setSubmitError('');
    setLoginEmail('');
    setLoginPassword('');
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
    setRegConfirmPassword('');
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setFormErrors({});
    setSubmitError('');
  };

  const validateLoginForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!loginPassword) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!regUsername.trim()) {
      errors.username = 'Username is required';
    } else if (regUsername.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!regEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!regPassword) {
      errors.password = 'Password is required';
    } else if (regPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!regConfirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await login(loginEmail.trim(), loginPassword);
      if (result.success) {
        onClose();
      } else {
        setSubmitError(result.error || 'Login failed');
      }
    } catch {
      setSubmitError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await register(regUsername.trim(), regEmail.trim(), regPassword);
      if (result.success) {
        onClose();
      } else {
        setSubmitError(result.error || 'Registration failed');
      }
    } catch {
      setSubmitError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="mb-6 text-xl font-bold text-white">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        {/* Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
                }`}
              />
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-400">{formErrors.password}</p>
              )}
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-500/30 bg-red-900/20 px-3 py-2">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="font-medium text-purple-400 hover:text-purple-300"
              >
                Create one
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="reg-username" className="mb-1 block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="reg-username"
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="Choose a username"
                className={`w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  formErrors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
                }`}
              />
              {formErrors.username && (
                <p className="mt-1 text-xs text-red-400">{formErrors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={`w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
                }`}
              />
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-400">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-confirm-password" className="mb-1 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="reg-confirm-password"
                type="password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full rounded-lg border bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  formErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
                }`}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">{formErrors.confirmPassword}</p>
              )}
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-500/30 bg-red-900/20 px-3 py-2">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="font-medium text-purple-400 hover:text-purple-300"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// Updated: 2026-05-26 - Phase 3