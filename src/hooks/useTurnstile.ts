import { useEffect, useRef, useState, type RefObject } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          action?: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    __turnstileScriptLoading__?: boolean;
  }
}

const SCRIPT_ID = 'cf-turnstile-js';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

function loadTurnstileScript(onReady: () => void) {
  if (window.turnstile) {
    onReady();
    return;
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    existing.addEventListener('load', onReady);
    return;
  }

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  script.addEventListener('load', onReady);
  document.head.appendChild(script);
}

interface UseTurnstileOptions {
  sitekey: string;
  action: string;
}

interface UseTurnstileResult {
  token: string;
  containerRef: RefObject<HTMLDivElement>;
  reset: () => void;
}

export function useTurnstile({ sitekey, action }: UseTurnstileOptions): UseTurnstileResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      // Avoid double-rendering into the same container (e.g. StrictMode double-invoke).
      if (widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        action,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };

    loadTurnstileScript(renderWidget);
    // In case the script was already loaded by another instance of this hook
    // before this effect ran, try rendering immediately too.
    renderWidget();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [sitekey, action]);

  const reset = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setToken('');
    }
  };

  return { token, containerRef, reset };
}
