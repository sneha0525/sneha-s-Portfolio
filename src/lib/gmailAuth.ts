import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.setCustomParameters({
  prompt: 'select_account',
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user && cachedAccessToken) {
      onAuthSuccess?.(user, cachedAccessToken);
    } else if (!isSigningIn) {
      if (!user) {
        cachedAccessToken = null;
      }
      onAuthFailure?.();
    }
  });
};

export const googleSignIn = async (): Promise<{
  user: User;
  accessToken: string;
} | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Unable to obtain Gmail sending permission token.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

function encodeBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export interface SendGmailPayload {
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export const sendEmailViaGmailAPI = async (
  accessToken: string,
  payload: SendGmailPayload
): Promise<{ id: string; threadId: string }> => {
  const safeSubject = payload.subject.replace(/[\r\n]+/g, ' ').trim();
  const formattedBody = [
    `New Portfolio Inquiry for Sneha Sharma`,
    `--------------------------------------------------`,
    `From: ${payload.senderName} <${payload.senderEmail}>`,
    `Inquiry Type: ${payload.inquiryType}`,
    `Subject: ${safeSubject}`,
    ``,
    `Message:`,
    payload.message,
    ``,
    `--------------------------------------------------`,
    `Sent via Sneha Sharma's Portfolio Contact Studio`,
  ].join('\n');

  const mimeMessage = [
    `To: ${payload.recipientEmail}`,
    `Reply-To: ${payload.senderName} <${payload.senderEmail}>`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(`[Portfolio] ${safeSubject}`)))}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    formattedBody,
  ].join('\r\n');

  const raw = encodeBase64Url(mimeMessage);

  const response = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg =
      errorData?.error?.message ||
      `Gmail API returned status ${response.status}`;
    throw new Error(msg);
  }

  return response.json();
};
