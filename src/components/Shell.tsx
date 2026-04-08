import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatedBackground, type BackgroundMode } from "./AnimatedBackground";

type ShellProps = {
  children: ReactNode;
};

function modeFromPathname(pathname: string): BackgroundMode {
  if (pathname.startsWith("/career")) {
    return "career";
  }

  if (pathname.startsWith("/education")) {
    return "education";
  }

  if (pathname.startsWith("/blog")) {
    return "blog";
  }

  return "home";
}

export function Shell({ children }: ShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = modeFromPathname(location.pathname);
  const showBackButton = location.pathname !== "/";

  return (
    <div className="site-frame">
      <AnimatedBackground mode={mode} />
      <header className="topbar">
        {showBackButton ? (
          <button
            aria-label="Go back"
            className="back-button"
            onClick={() => navigate(-1)}
            type="button"
          >
            &larr;
          </button>
        ) : null}
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
