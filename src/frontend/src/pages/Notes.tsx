import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Download } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;
type Year = (typeof years)[number];

const subjects = [
  "All",
  "Account",
  "Economics",
  "Business Law",
  "Business Math",
  "Finance",
  "Marketing",
] as const;
type Subject = (typeof subjects)[number];

interface NoteItem {
  title: string;
  subject: Subject;
  year: Year;
  desc: string;
}

const notes: NoteItem[] = [
  // 1st Year
  {
    title: "Financial Accounting Notes",
    subject: "Account",
    year: "1st Year",
    desc: "Chapter-wise notes on journals, ledgers, trial balance and final accounts. Covers full TU syllabus.",
  },
  {
    title: "Business Economics Notes",
    subject: "Economics",
    year: "1st Year",
    desc: "Microeconomics fundamentals: demand, supply, elasticity, market structures. Easy-to-understand notes.",
  },
  {
    title: "Business Law Notes",
    subject: "Business Law",
    year: "1st Year",
    desc: "Contract Act, Agency, Sale of Goods. Summarized for exam preparation.",
  },
  {
    title: "Business Mathematics Notes",
    subject: "Business Math",
    year: "1st Year",
    desc: "Sets, matrices, progressions, and permutations. Includes solved examples.",
  },
  {
    title: "Principles of Finance Notes",
    subject: "Finance",
    year: "1st Year",
    desc: "Introduction to finance, time value of money, financial statements overview.",
  },
  {
    title: "Marketing Principles Notes",
    subject: "Marketing",
    year: "1st Year",
    desc: "Marketing mix, consumer behavior, market segmentation. All key concepts covered.",
  },

  // 2nd Year
  {
    title: "Cost Accounting Notes",
    subject: "Account",
    year: "2nd Year",
    desc: "Cost concepts, job costing, process costing, marginal costing. Practical examples included.",
  },
  {
    title: "Macroeconomics Notes",
    subject: "Economics",
    year: "2nd Year",
    desc: "National income, GDP, inflation, monetary and fiscal policy explained clearly.",
  },
  {
    title: "Company Law Notes",
    subject: "Business Law",
    year: "2nd Year",
    desc: "Company formation, directors, meetings, winding up. Important sections highlighted.",
  },
  {
    title: "Business Statistics Notes",
    subject: "Business Math",
    year: "2nd Year",
    desc: "Mean, median, mode, regression, correlation, index numbers. Formulas and examples.",
  },
  {
    title: "Business Finance Notes",
    subject: "Finance",
    year: "2nd Year",
    desc: "Capital structure, working capital, dividend policy, leverage analysis.",
  },
  {
    title: "Consumer Behaviour Notes",
    subject: "Marketing",
    year: "2nd Year",
    desc: "Buying decision process, motivation, perception, attitudes and culture.",
  },

  // 3rd Year
  {
    title: "Advanced Accounting Notes",
    subject: "Account",
    year: "3rd Year",
    desc: "Partnership accounts, amalgamation, branch accounting, hire purchase.",
  },
  {
    title: "Development Economics Notes",
    subject: "Economics",
    year: "3rd Year",
    desc: "Economic development theories, poverty, inequality, and economic planning in Nepal context.",
  },
  {
    title: "Tax Law Notes",
    subject: "Business Law",
    year: "3rd Year",
    desc: "Income tax, VAT, customs duty. Nepal-specific tax laws summarized for exam.",
  },
  {
    title: "Quantitative Techniques Notes",
    subject: "Business Math",
    year: "3rd Year",
    desc: "Linear programming, transportation model, assignment problem, game theory.",
  },
  {
    title: "Financial Management Notes",
    subject: "Finance",
    year: "3rd Year",
    desc: "Capital budgeting, cost of capital, risk and return, portfolio theory.",
  },
  {
    title: "Marketing Management Notes",
    subject: "Marketing",
    year: "3rd Year",
    desc: "Product lifecycle, pricing strategies, promotion, distribution channels.",
  },

  // 4th Year
  {
    title: "Auditing Notes",
    subject: "Account",
    year: "4th Year",
    desc: "Auditing principles, audit procedures, internal control, audit report writing.",
  },
  {
    title: "International Economics Notes",
    subject: "Economics",
    year: "4th Year",
    desc: "Trade theories, balance of payments, exchange rates, international trade policy.",
  },
  {
    title: "Labour Law Notes",
    subject: "Business Law",
    year: "4th Year",
    desc: "Labour Act Nepal, employment contracts, trade unions, industrial disputes.",
  },
  {
    title: "Operations Research Notes",
    subject: "Business Math",
    year: "4th Year",
    desc: "Queuing theory, simulation, inventory models, decision analysis.",
  },
  {
    title: "Investment Analysis Notes",
    subject: "Finance",
    year: "4th Year",
    desc: "Security analysis, valuation models, portfolio management, derivatives.",
  },
  {
    title: "Rural Marketing Notes",
    subject: "Marketing",
    year: "4th Year",
    desc: "Rural market characteristics, marketing strategies for rural Nepal, challenges.",
  },
];

const subjectBadgeColor: Record<Subject, string> = {
  All: "",
  Account: "bg-blue-50 text-blue-700 border-blue-200",
  Economics: "bg-purple-50 text-purple-700 border-purple-200",
  "Business Law": "bg-rose-50 text-rose-700 border-rose-200",
  "Business Math": "bg-orange-50 text-orange-700 border-orange-200",
  Finance: "bg-green-50 text-green-700 border-green-200",
  Marketing: "bg-teal-50 text-teal-700 border-teal-200",
};

function handleDownload() {
  toast.info("Download coming soon!", {
    description: "PDF download will be available shortly.",
  });
}

export function Notes() {
  const [activeYear, setActiveYear] = useState<Year>("1st Year");
  const [activeSubject, setActiveSubject] = useState<Subject>("All");
  useNavigate();

  const filtered = notes.filter(
    (n) =>
      n.year === activeYear &&
      (activeSubject === "All" || n.subject === activeSubject),
  );

  return (
    <main className="min-h-screen">
      <section className="bg-hero py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link to="/" data-ocid="notes.back.link">
              <ArrowLeft size={14} className="mr-1" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                BBS Notes
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Free, chapter-wise notes for all 4 years. Download and study at
                your own pace.
              </p>
            </div>
          </div>

          {/* Year tabs */}
          <div
            className="flex gap-2 flex-wrap mt-6"
            role="tablist"
            aria-label="BBS year"
          >
            {years.map((y) => (
              <button
                key={y}
                type="button"
                role="tab"
                aria-selected={activeYear === y}
                onClick={() => {
                  setActiveYear(y);
                  setActiveSubject("All");
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeYear === y
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/70 border-border hover:border-primary hover:text-primary"
                }`}
                data-ocid={`notes.year.${y.replace(" ", "_").toLowerCase()}.tab`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Subject filters */}
          <div className="flex gap-2 flex-wrap mt-3">
            {subjects.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveSubject(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
                  activeSubject === s
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "bg-card text-foreground/60 border-border hover:text-primary hover:border-primary/30"
                }`}
                data-ocid={`notes.subject.${s.replace(/\s+/g, "_").toLowerCase()}.button`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} note{filtered.length !== 1 ? "s" : ""} found for{" "}
            {activeYear}
            {activeSubject !== "All" ? ` · ${activeSubject}` : ""}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p>No notes found for this filter. Try a different subject.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((note, i) => (
                <motion.article
                  key={note.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
                  data-ocid={`notes.item.${i + 1}`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${subjectBadgeColor[note.subject]}`}
                    >
                      {note.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {note.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">
                      {note.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {note.desc}
                  </p>
                  <div className="mt-auto pt-2 border-t border-border">
                    <Button
                      size="sm"
                      className="h-7 text-xs gap-1 w-full"
                      onClick={handleDownload}
                      data-ocid={`notes.download_button.${i + 1}`}
                    >
                      <Download size={12} /> Download PDF
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
