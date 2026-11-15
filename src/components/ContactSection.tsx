import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  LoaderCircle,
  LogOut,
  Mail,
  Send,
  X,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  getAccessToken,
  googleSignIn,
  initAuth,
  logout,
  sendEmailViaGmailAPI,
} from '../lib/gmailAuth';

const inputCls =
  'mt-1 w-full rounded-md border-2 border-ink bg-white px-4 py-3 tx text-ink outline-none focus:border-tang focus:ring-2 focus:ring-tang/30 transition-colors';

function ContactForm() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
        setForm((prev) => ({
          ...prev,
          name: prev.name || authedUser.displayName || '',
          email: prev.email || authedUser.email || '',
        }));
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const setField =
    (k: 'name' | 'email' | 'message') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setStatus(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setForm((prev) => ({
          ...prev,
          name: prev.name || result.user.displayName || '',
          email: prev.email || result.user.email || '',
        }));
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Google sign-in was cancelled or failed.';
      setStatus({ type: 'error', text: msg });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
  };

  const handlePrepareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: 'error',
        text: 'Please fill in your name, email, and message.',
      });
      return;
    }

    const token = accessToken || getAccessToken();
    if (!token) {
      setStatus({
        type: 'error',
        text: 'Connect Google above to send straight to Sneha’s Gmail, or click "Open in Gmail" below.',
      });
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSend = async () => {
    const token = accessToken || getAccessToken();
    if (!token) {
      setShowConfirmModal(false);
      setStatus({
        type: 'error',
        text: 'Session expired. Please sign in with Google again.',
      });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      await sendEmailViaGmailAPI(token, {
        recipientEmail: PROFILE.email,
        senderName: form.name.trim(),
        senderEmail: form.email.trim(),
        inquiryType: 'Portfolio Inquiry',
        subject: `Message from ${form.name.trim()}`,
        message: form.message.trim(),
      });

      setShowConfirmModal(false);
      setStatus({
        type: 'success',
        text: `Message sent directly to ${PROFILE.email}. Sneha will get back to you soon.`,
      });
      setForm((prev) => ({ ...prev, message: '' }));
    } catch (err: unknown) {
      setShowConfirmModal(false);
      const errMsg =
        err instanceof Error
          ? err.message
          : 'Couldn’t send via Gmail API. Try the "Open in Gmail" option below.';
      setStatus({ type: 'error', text: errMsg });
    } finally {
      setSending(false);
    }
  };

  const gmailComposeUrl = (() => {
    const su = encodeURIComponent(
      `[Portfolio] Message from ${form.name.trim() || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Hi Sneha,\n\nName: ${form.name.trim() || '—'}\nEmail: ${
        form.email.trim() || '—'
      }\n\n${form.message.trim()}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PROFILE.email
    )}&su=${su}&body=${body}`;
  })();

  return (
    <>
      <form
        onSubmit={handlePrepareSubmit}
        className="lg:col-span-6 rounded-2xl bg-mist text-ink p-8 space-y-5"
      >
        {/* Gmail Delivery Connection Header */}
        <div className="pb-4 border-b border-ink/15 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mono text-xs text-rust">
              delivery → {PROFILE.email}
            </p>
            <p className="text-xs text-moss mt-0.5">
              {user && accessToken
                ? `Connected as ${user.email}`
                : 'Sign in with Google to send directly to Gmail'}
            </p>
          </div>

          {user && accessToken ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-2 border-ink rounded-md hover:bg-ink hover:text-mist transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sign out</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="gsi-material-button"
            >
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    style={{ display: 'block' }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span className="gsi-material-button-contents">
                  {isSigningIn ? 'Connecting...' : 'Sign in with Google'}
                </span>
              </div>
            </button>
          )}
        </div>

        {(
          [
            ['name', 'text'],
            ['email', 'email'],
          ] as const
        ).map(([k, t]) => (
          <label key={k} className="block">
            <span className="mono text-xs">{k}</span>
            <input
              type={t}
              required
              value={form[k]}
              onChange={setField(k)}
              className={inputCls}
            />
          </label>
        ))}

        <label className="block">
          <span className="mono text-xs">message</span>
          <textarea
            rows={4}
            required
            value={form.message}
            onChange={setField('message')}
            className={inputCls}
          />
        </label>

        {status && (
          <div
            role="status"
            className={`p-3.5 rounded-md border-2 text-xs font-medium flex items-start gap-2.5 ${
              status.type === 'success'
                ? 'bg-sage border-ink text-ink'
                : 'bg-white border-rust text-rust'
            }`}
          >
            {status.type === 'success' ? (
              <Check className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle
                className="w-4 h-4 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            )}
            <span>{status.text}</span>
          </div>
        )}

        <div className="space-y-3 pt-1">
          <button
            type="submit"
            disabled={sending || !accessToken}
            className="group w-full rounded-md bg-tang text-ink py-4 font-bold inline-flex justify-center items-center gap-2 hover:bg-ink hover:text-mist transition-colors disabled:opacity-55 cursor-pointer disabled:cursor-not-allowed"
          >
            {sending && (
              <LoaderCircle
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
            )}
            <span>Send message</span>
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>

          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-md border-2 border-ink bg-white text-ink py-3 text-sm font-semibold inline-flex justify-center items-center gap-2 hover:bg-ink hover:text-mist transition-colors"
          >
            <Mail className="w-4 h-4 text-rust" aria-hidden="true" />
            <span>Open in Gmail Compose</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </form>

      {/* Explicit Confirmation Dialog Before Sending Gmail Email */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-gmail-title"
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-mist text-ink border-2 border-ink p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="confirm-gmail-title"
                  className="text-xl font-bold tracking-tight"
                >
                  Confirm Gmail Delivery
                </h3>
                <p className="text-xs text-moss mt-1">
                  Review your message before sending it to Sneha&apos;s Gmail.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                aria-label="Cancel sending email"
                className="p-1.5 rounded-md hover:bg-ink/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl bg-white border border-ink/15 p-4 space-y-2 text-xs">
              <div>
                <span className="mono text-moss">to: </span>
                <span className="font-semibold">{PROFILE.email}</span>
              </div>
              <div>
                <span className="mono text-moss">from: </span>
                <span className="font-semibold">
                  {user?.email || form.email}
                </span>
              </div>
              <div>
                <span className="mono text-moss">name: </span>
                <span className="font-semibold">{form.name}</span>
              </div>
              <div className="pt-2 border-t border-ink/10 tx text-sm whitespace-pre-wrap max-h-36 overflow-y-auto">
                {form.message}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={sending}
                className="px-4 py-2.5 text-xs font-semibold border-2 border-ink rounded-md hover:bg-ink/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                disabled={sending}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-tang text-ink rounded-md hover:bg-ink hover:text-mist transition-colors cursor-pointer disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{sending ? 'Sending...' : 'Confirm & Send'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink text-mist py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 min-w-0">
          <p className="lb text-peach">India · open to roles</p>
          <h2 className="font-bold mt-4 text-[clamp(44px,7vw,112px)] leading-[.92] tracking-[-.035em]">
            INSERT INTO your team.
          </h2>

          <div className="mt-10 space-y-3 tx">
            <a
              href={`mailto:${PROFILE.email}`}
              className="block font-bold text-xl break-all hover:text-tang transition-colors"
            >
              {PROFILE.email}
            </a>
            <a
              href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
              className="block num hover:text-tang transition-colors"
            >
              {PROFILE.phone}
            </a>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-mist px-4 py-2 hover:bg-mist hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={PROFILE.behanceProject}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-mist px-4 py-2 hover:bg-mist hover:text-ink transition-colors"
              >
                Behance
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
