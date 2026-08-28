import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Emblem } from "@/components/Emblem";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";

export function Header() {
  const { pathname, hash } = useLocation();
  const scrolled = useScrolled(16);
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const menuId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDesktopMenu(null);
    setOpenMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "bg-shrine-maroon-950/92 shadow-shrine backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="hidden border-b border-shrine-cream/10 bg-shrine-maroon-950/80 lg:block">
        <Container className="flex h-9 items-center justify-between text-[11px] uppercase tracking-[0.18em] text-shrine-cream/70">
          <p>
            {site.address.street} · {site.feast.name} · {site.feast.date}
          </p>
          <Link
            to="/give"
            className="link-underline font-semibold text-shrine-gold-300 transition-colors hover:text-shrine-gold-100"
          >
            Give to the parish
          </Link>
        </Container>
      </div>

      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-shrine-cream">
          <Emblem className="text-shrine-gold-300" />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold sm:text-lg">
              St Joseph&apos;s Church
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-shrine-gold-300/90">
              Bukit Timah · {site.chineseName}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const childActive =
              item.children?.some((child) => child.to.split("#")[0] === pathname) ?? false;
            return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDesktopMenu(item.label)}
              onMouseLeave={() => item.children && setOpenDesktopMenu(null)}
              onFocusCapture={() => item.children && setOpenDesktopMenu(item.label)}
              onBlurCapture={(event) => {
                if (!item.children) return;
                const next = event.relatedTarget as HTMLElement | null;
                if (next && event.currentTarget.contains(next)) return;
                setOpenDesktopMenu(null);
              }}
            >
              {item.children ? (
                <button
                  type="button"
                  aria-expanded={openDesktopMenu === item.label}
                  aria-haspopup="true"
                  aria-current={childActive ? "true" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:text-shrine-gold-300",
                    childActive ? "text-shrine-gold-300" : "text-shrine-cream/85",
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : (
                <Link
                  to={item.to}
                  aria-current={pathname === item.to ? "page" : undefined}
                  className={cn(
                    "inline-flex px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:text-shrine-gold-300",
                    pathname === item.to ? "text-shrine-gold-300" : "text-shrine-cream/85",
                  )}
                >
                  {item.label}
                </Link>
              )}

              {item.children && openDesktopMenu === item.label ? (
                <div className="absolute left-0 top-full z-50 min-w-[17.5rem] pt-2">
                  <ul
                    className="menu-in border border-shrine-stone bg-shrine-cream py-2 shadow-shrine-lg"
                    onClickCapture={() =>
                      setOpenDesktopMenu(null)
                    }
                  >
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          aria-current={pathname + hash === child.to ? "page" : undefined}
                          className="block px-4 py-2.5 transition-colors hover:bg-shrine-maroon-50"
                        >
                          <span className="block font-display text-sm font-semibold text-shrine-maroon-700">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-xs leading-snug text-shrine-charcoal/70">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            );
          })}
          <Link
            to="/give"
            className="ml-3 rounded-sm bg-shrine-gold-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-shrine-maroon-900 transition-colors hover:bg-shrine-gold-300"
          >
            Give
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-shrine-cream lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen ? (
        <div
          id={menuId}
          className="drawer-in fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto bg-shrine-maroon-950 lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="px-5 py-6"
            onClickCapture={(event) => {
              // A link to the CURRENT route never changes pathname, so the
              // pathname effect below cannot close the drawer — close it on
              // link activation itself. Section toggle buttons are unaffected.
              if ((event.target as HTMLElement).closest("a")) {
                setMobileOpen(false);
              }
            }}
          >
            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.label} className="border-b border-shrine-cream/10">
                  {item.children ? (
                    <div>
                      <button
                        type="button"
                        aria-expanded={openMobileSection === item.label}
                        className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-shrine-cream"
                        onClick={() =>
                          setOpenMobileSection((current) =>
                            current === item.label ? null : item.label,
                          )
                        }
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openMobileSection === item.label && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      {openMobileSection === item.label ? (
                        <ul className="mb-3 space-y-1 pl-3">
                          {item.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                className="block py-2 text-sm text-shrine-cream/75"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : (
                    <Link to={item.to} className="block py-3 text-base font-medium text-shrine-cream">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  to="/give"
                  className="mt-4 block bg-shrine-gold-500 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-shrine-maroon-900"
                >
                  Give to the parish
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
