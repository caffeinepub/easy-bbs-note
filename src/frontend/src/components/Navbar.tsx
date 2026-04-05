import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, GraduationCap, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const resourceLinks = [
  { label: "Notes", href: "/resources/notes" },
  { label: "PDFs", href: "/resources/pdf" },
  { label: "Past Questions", href: "/resources/pastQuestion" },
  { label: "Solutions", href: "/resources/solution" },
  { label: "Syllabus", href: "/resources/syllabus" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim() } });
      setMobileOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-card shadow-nav border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap size={20} className="text-primary-foreground" />
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-lg text-foreground">
                BBS HUB
              </div>
              <div className="text-[10px] font-medium text-primary tracking-widest uppercase">
                Nepal
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
              data-ocid="nav.home.link"
            >
              Home
            </Link>

            {/* Resources dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                data-ocid="nav.resources.toggle"
              >
                Resources
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-44 bg-popover rounded-lg shadow-lift border border-border py-1 z-50"
                  data-ocid="nav.resources.dropdown_menu"
                >
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary transition-colors"
                      onClick={() => setDropdownOpen(false)}
                      data-ocid="nav.resources.link"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/exam-tips"
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
              data-ocid="nav.examtips.link"
            >
              Exam Tips
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
              data-ocid="nav.about.link"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="pl-8 h-8 text-sm w-44 bg-background"
                data-ocid="nav.search_input"
              />
            </form>
            <Button
              size="sm"
              asChild
              data-ocid="nav.get_started.primary_button"
            >
              <Link to="/resources/$type" params={{ type: "notes" }}>
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-secondary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            data-ocid="nav.menu.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-card border-t border-border px-4 pb-4 pt-2 space-y-1"
          data-ocid="nav.mobile.panel"
        >
          <Link
            to="/"
            className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.home.link"
          >
            Home
          </Link>

          {/* Mobile resources */}
          <div ref={mobileDropdownRef}>
            <button
              type="button"
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
              onClick={() => setMobileResourcesOpen((v) => !v)}
              data-ocid="nav.mobile.resources.toggle"
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileResourcesOpen && (
              <div
                className="pl-4 mt-1 space-y-1"
                data-ocid="nav.mobile.resources.panel"
              >
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-3 py-1.5 text-sm rounded-md hover:bg-secondary text-foreground/80"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.mobile.resources.link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/exam-tips"
            className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.examtips.link"
          >
            Exam Tips
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.about.link"
          >
            About Us
          </Link>

          <form onSubmit={handleSearch} className="flex gap-2 pt-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials..."
              className="flex-1 h-9 text-sm"
              data-ocid="nav.mobile.search_input"
            />
            <Button
              size="sm"
              type="submit"
              data-ocid="nav.mobile.search.primary_button"
            >
              <Search size={14} />
            </Button>
          </form>

          <Button
            className="w-full mt-2"
            size="sm"
            asChild
            data-ocid="nav.mobile.get_started.primary_button"
          >
            <Link
              to="/resources/$type"
              params={{ type: "notes" }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
