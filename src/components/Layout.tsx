import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";

function resolveAnchor(pathname: string, hash: string) {
  if (hash && hash.length > 1) {
    return hash.slice(1);
  }
  const raw = window.location.hash;
  const parts = raw.split("#").filter(Boolean);
  if (parts.length < 2) return "";
  const last = parts[parts.length - 1] ?? "";
  const cleaned = last.replace(/^\//, "");
  if (!cleaned || cleaned === pathname.replace(/^\//, "")) return "";
  return cleaned;
}

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = resolveAnchor(pathname, hash);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        const timer = window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
        return () => window.clearTimeout(timer);
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
