import { Link } from "@tanstack/react-router";
import { Facebook, GraduationCap, Mail, Twitter, Youtube } from "lucide-react";

type ResourceTypeParam =
  | "notes"
  | "pdf"
  | "pastQuestion"
  | "solution"
  | "syllabus";

const resourceTypeLinks: { label: string; type: ResourceTypeParam }[] = [
  { label: "Notes", type: "notes" },
  { label: "PDFs", type: "pdf" },
  { label: "Past Questions", type: "pastQuestion" },
  { label: "Solutions", type: "solution" },
  { label: "Syllabus", type: "syllabus" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <GraduationCap size={20} className="text-primary-foreground" />
              </div>
              <div className="leading-none">
                <div className="font-display font-bold text-lg text-navy-foreground">
                  BBS HUB
                </div>
                <div className="text-[10px] font-medium tracking-widest uppercase text-navy-foreground/60">
                  Nepal
                </div>
              </div>
            </div>
            <p className="text-navy-foreground/70 text-sm leading-relaxed">
              Your ultimate study companion for BBS (Bachelor of Business
              Studies) in Nepal. Access notes, past questions, solutions, and
              exam tips for all 4 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-navy-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {resourceTypeLinks.map((link) => (
                <li key={link.type}>
                  <Link
                    to="/resources/$type"
                    params={{ type: link.type }}
                    className="text-navy-foreground/70 hover:text-navy-foreground text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/exam-tips"
                  className="text-navy-foreground/70 hover:text-navy-foreground text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Exam Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-navy-foreground mb-4 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <p className="text-navy-foreground/70 text-sm mb-4">
              Join our community of BBS students across Nepal.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-navy-foreground/10 hover:bg-primary/40 flex items-center justify-center transition-colors"
                aria-label="Facebook"
                data-ocid="footer.facebook.link"
              >
                <Facebook size={15} className="text-navy-foreground" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-navy-foreground/10 hover:bg-primary/40 flex items-center justify-center transition-colors"
                aria-label="Twitter"
                data-ocid="footer.twitter.link"
              >
                <Twitter size={15} className="text-navy-foreground" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-navy-foreground/10 hover:bg-primary/40 flex items-center justify-center transition-colors"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
              >
                <Youtube size={15} className="text-navy-foreground" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-navy-foreground/10 hover:bg-primary/40 flex items-center justify-center transition-colors"
                aria-label="Email"
                data-ocid="footer.email.link"
              >
                <Mail size={15} className="text-navy-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-foreground/50 text-sm">
            &copy; {year} BBS Hub Nepal. All rights reserved.
          </p>
          <p className="text-navy-foreground/50 text-sm">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-navy-foreground underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
