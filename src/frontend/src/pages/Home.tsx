import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  List,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ExamTipCard } from "../components/ExamTipCard";

const categories = [
  {
    href: "/notes",
    icon: <BookOpen size={28} className="text-primary" />,
    label: "Notes",
    subtitle: "1st–4th Year",
  },
  {
    href: "/resources/pdf",
    icon: <FileText size={28} className="text-primary" />,
    label: "PDFs",
    subtitle: "Study Materials",
  },
  {
    href: "/past-questions",
    icon: <HelpCircle size={28} className="text-primary" />,
    label: "Past Questions",
    subtitle: "2070–2080 BS",
  },
  {
    href: "/resources/solution",
    icon: <CheckCircle size={28} className="text-primary" />,
    label: "Solutions",
    subtitle: "Step-by-Step",
  },
  {
    href: "/exam-tips",
    icon: <Lightbulb size={28} className="text-primary" />,
    label: "Exam Tips",
    subtitle: "Score Higher",
  },
  {
    href: "/syllabus",
    icon: <List size={28} className="text-primary" />,
    label: "Syllabus",
    subtitle: "TU Approved",
  },
];

const benefits = [
  {
    icon: <BookOpen size={22} className="text-primary" />,
    title: "Free Notes",
    desc: "All subjects, all 4 years — completely free",
  },
  {
    icon: <HelpCircle size={22} className="text-primary" />,
    title: "Past Questions",
    desc: "Papers from 2070–2080 BS for every subject",
  },
  {
    icon: <CheckCircle size={22} className="text-primary" />,
    title: "Model Solutions",
    desc: "Step-by-step answers written by top students",
  },
  {
    icon: <Lightbulb size={22} className="text-primary" />,
    title: "Exam Tips",
    desc: "Smart strategies to score higher in exams",
  },
  {
    icon: <Smartphone size={22} className="text-primary" />,
    title: "Mobile Friendly",
    desc: "Study anywhere, anytime on any device",
  },
  {
    icon: <RefreshCw size={22} className="text-primary" />,
    title: "Always Updated",
    desc: "Fresh content added regularly by contributors",
  },
];

const sampleTips = [
  {
    title: "Past Questions Analysis",
    content:
      "Review past question papers to understand exam patterns and frequently asked topics. This is the #1 strategy for scoring high.",
    subject: "All Subjects",
    tags: ["exam strategy", "past questions"],
  },
  {
    title: "Time Management",
    content:
      "Allocate specific study time for each subject daily. Use a timetable and stick to it — consistency beats cramming every time.",
    subject: "All Subjects",
    tags: ["time management", "study habits"],
  },
  {
    title: "Regular Revision",
    content:
      "Revise notes regularly. Create short summary notes for quick revision before exams. Spaced repetition is the key.",
    subject: "All Subjects",
    tags: ["revision", "study tips"],
  },
];

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/notes", search: { q: searchQuery.trim() } });
    }
  }

  return (
    <main>
      {/* Hero */}
      <section
        className="bg-hero py-12 md:py-20 relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="100%"
            height="100%"
            className="opacity-20"
            role="presentation"
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="oklch(0.6 0.1 225)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <GraduationCap size={14} /> BBS Nepal – All Years
              </div>
              <h1
                id="hero-heading"
                className="font-display font-extrabold text-4xl sm:text-5xl text-foreground leading-tight"
              >
                Welcome to <span className="text-primary">Easy BBS Note!</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                Your FREE study companion for BBS students in Nepal. Download
                notes, past questions, solutions and exam tips – all in one
                place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  asChild
                  data-ocid="hero.download_notes.primary_button"
                >
                  <Link to="/notes">
                    Download Notes Now <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  data-ocid="hero.past_questions.secondary_button"
                >
                  <Link to="/past-questions">Browse Past Questions</Link>
                </Button>
              </div>
              <div>
                <label
                  htmlFor="hero-search"
                  className="block text-sm font-medium text-foreground/80 mb-2"
                >
                  Find Study Materials
                </label>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="hero-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., Financial Accounting, Business Law..."
                      className="pl-9 bg-card text-sm"
                      data-ocid="hero.search_input"
                    />
                  </div>
                  <Button type="submit" data-ocid="hero.search.primary_button">
                    <Search size={15} />
                  </Button>
                </form>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:block"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                <img
                  src="/assets/generated/bbs-students-library.dim_600x450.jpg"
                  alt="BBS students studying"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-5" aria-label="Statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-primary-foreground">
            {[
              { value: "500+", label: "Study Materials" },
              { value: "200+", label: "Past Papers" },
              { value: "4 Years", label: "BBS Coverage" },
              { value: "10k+", label: "Students Helped" },
            ].map((s) => (
              <div key={s.label} className="py-1">
                <div className="font-display font-bold text-2xl">{s.value}</div>
                <div className="text-primary-foreground/80 text-xs mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <h2
              id="benefits-heading"
              className="font-display font-bold text-3xl text-foreground"
            >
              Why Choose Easy BBS Note?
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
              Everything you need to excel in your BBS exams, completely free.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <div className="bg-card rounded-2xl border border-border p-5 flex gap-4 items-start hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {b.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="py-16 bg-secondary/40"
        aria-labelledby="categories-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-10"
          >
            <h2
              id="categories-heading"
              className="font-display font-bold text-3xl text-foreground"
            >
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
              Pick a category and start studying right away.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link
                  to={cat.href}
                  className="group flex flex-col items-center text-center p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                  data-ocid={`categories.${cat.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center mb-3 transition-colors">
                    {cat.icon}
                  </div>
                  <span className="font-semibold text-sm text-foreground">
                    {cat.label}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {cat.subtitle}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Tips */}
      <section className="py-16" aria-labelledby="tips-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h2
                id="tips-heading"
                className="font-display font-bold text-3xl text-foreground"
              >
                Top Exam Tips
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Smart strategies to boost your BBS score
              </p>
            </motion.div>
            <Link
              to="/exam-tips"
              className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              data-ocid="tips.view_all.link"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <ExamTipCard tip={tip} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2
              id="cta-heading"
              className="font-display font-bold text-3xl text-primary-foreground mb-3"
            >
              Start Studying Smarter Today
            </h2>
            <p className="text-primary-foreground/80 text-base mb-6">
              Join thousands of BBS students who use Easy BBS Note to prepare
              and score better.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                data-ocid="cta.notes.primary_button"
              >
                <Link to="/notes">Download Notes Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
                data-ocid="cta.questions.secondary_button"
              >
                <Link to="/past-questions">Browse Past Questions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
