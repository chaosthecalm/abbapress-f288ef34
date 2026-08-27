import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after hydration. WebGL canvases and any
 * browser-only measurement must never run during SSR.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
