import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, List } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;
type Year = (typeof years)[number];

interface SyllabusItem {
  subject: string;
  year: Year;
  credits: string;
  desc: string;
}

const syllabusData: SyllabusItem[] = [
  // 1st Year
  {
    subject: "Financial Accounting",
    year: "1st Year",
    credits: "6 Credits",
    desc: "Basics of accounting, journal, ledger, trial balance, final accounts.",
  },
  {
    subject: "Business Economics (Micro)",
    year: "1st Year",
    credits: "6 Credits",
    desc: "Demand, supply, consumer theory, production, market structures.",
  },
  {
    subject: "Business Law",
    year: "1st Year",
    credits: "6 Credits",
    desc: "Contract Act, Sale of Goods, Negotiable Instruments, Agency.",
  },
  {
    subject: "Business Mathematics",
    year: "1st Year",
    credits: "6 Credits",
    desc: "Sets, matrices, sequence and series, permutation and combination.",
  },
  {
    subject: "Principles of Finance",
    year: "1st Year",
    credits: "6 Credits",
    desc: "Introduction to finance, time value of money, financial statements.",
  },
  {
    subject: "Business Communication",
    year: "1st Year",
    credits: "6 Credits",
    desc: "Business writing, presentation, report writing, communication models.",
  },

  // 2nd Year
  {
    subject: "Cost Accounting",
    year: "2nd Year",
    credits: "6 Credits",
    desc: "Cost concepts, job costing, process costing, marginal costing.",
  },
  {
    subject: "Business Economics (Macro)",
    year: "2nd Year",
    credits: "6 Credits",
    desc: "National income, money, banking, fiscal and monetary policy.",
  },
  {
    subject: "Company Law",
    year: "2nd Year",
    credits: "6 Credits",
    desc: "Company formation, management, meetings, winding up.",
  },
  {
    subject: "Business Statistics",
    year: "2nd Year",
    credits: "6 Credits",
    desc: "Measures of central tendency, dispersion, regression, correlation.",
  },
  {
    subject: "Business Finance",
    year: "2nd Year",
    credits: "6 Credits",
    desc: "Capital structure, working capital management, leverage.",
  },
  {
    subject: "Marketing",
    year: "2nd Year",
    credits: "6 Credits",
    desc: "Marketing concepts, consumer behavior, market segmentation.",
  },

  // 3rd Year
  {
    subject: "Advanced Accounting",
    year: "3rd Year",
    credits: "6 Credits",
    desc: "Partnership, branch accounting, hire purchase, amalgamation.",
  },
  {
    subject: "Development Economics",
    year: "3rd Year",
    credits: "6 Credits",
    desc: "Economic development, poverty, inequality, planning in Nepal.",
  },
  {
    subject: "Tax Law",
    year: "3rd Year",
    credits: "6 Credits",
    desc: "Income Tax Act, VAT Act Nepal, customs and excise.",
  },
  {
    subject: "Quantitative Techniques",
    year: "3rd Year",
    credits: "6 Credits",
    desc: "Linear programming, transportation, assignment, game theory.",
  },
  {
    subject: "Financial Management",
    year: "3rd Year",
    credits: "6 Credits",
    desc: "Capital budgeting, cost of capital, dividend policy, risk and return.",
  },
  {
    subject: "Marketing Management",
    year: "3rd Year",
    credits: "6 Credits",
    desc: "Product, price, place, promotion strategies; marketing planning.",
  },

  // 4th Year
  {
    subject: "Auditing",
    year: "4th Year",
    credits: "6 Credits",
    desc: "Audit planning, internal control, audit procedures and reporting.",
  },
  {
    subject: "International Economics",
    year: "4th Year",
    credits: "6 Credits",
    desc: "Trade theories, balance of payments, exchange rates, WTO.",
  },
  {
    subject: "Labour Law",
    year: "4th Year",
    credits: "6 Credits",
    desc: "Labour Act Nepal, employment, trade unions, industrial disputes.",
  },
  {
    subject: "Operations Research",
    year: "4th Year",
    credits: "6 Credits",
    desc: "Queuing, simulation, inventory models, decision analysis.",
  },
  {
    subject: "Investment Analysis",
    year: "4th Year",
    credits: "6 Credits",
    desc: "Security valuation, portfolio management, derivatives, mutual funds.",
  },
  {
    subject: "Entrepreneurship",
    year: "4th Year",
    credits: "6 Credits",
    desc: "Entrepreneurial process, business plan, venture financing, SMEs in Nepal.",
  },
];

function handleDownload() {
  toast.info("Download coming soon!", {
    description: "Syllabus PDF will be available shortly.",
  });
}

export function Syllabus() {
  const [activeYear, setActiveYear] = useState<Year>("1st Year");

  const filtered = syllabusData.filter((s) => s.year === activeYear);

  return (
    <main className="min-h-screen">
      <section className="bg-hero py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link to="/" data-ocid="syllabus.back.link">
              <ArrowLeft size={14} className="mr-1" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <List size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                BBS Syllabus
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                TU-approved official syllabus for all 4 years of BBS (Bachelor
                of Business Studies).
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
                onClick={() => setActiveYear(y)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeYear === y
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/70 border-border hover:border-primary hover:text-primary"
                }`}
                data-ocid={`syllabus.year.${y.replace(" ", "_").toLowerCase()}.tab`}
              >
                {y}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Syllabus as per Tribhuvan University (TU) guidelines.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s, i) => (
              <motion.article
                key={s.subject}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
                data-ocid={`syllabus.item.${i + 1}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-teal-50 text-teal-700 border-teal-200">
                    Syllabus
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {s.credits}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {s.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-auto pt-2 border-t border-border">
                  <Button
                    size="sm"
                    className="h-7 text-xs gap-1 w-full"
                    onClick={handleDownload}
                    data-ocid={`syllabus.download_button.${i + 1}`}
                  >
                    <Download size={12} /> Download Syllabus
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
