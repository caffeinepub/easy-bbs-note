import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;
type Year = (typeof years)[number];

interface PaperItem {
  title: string;
  subject: string;
  examYear: string;
  year: Year;
}

const papers: PaperItem[] = [
  // 1st Year
  {
    title: "Financial Accounting Past Question 2080",
    subject: "Financial Accounting",
    examYear: "2080 BS",
    year: "1st Year",
  },
  {
    title: "Financial Accounting Past Question 2078",
    subject: "Financial Accounting",
    examYear: "2078 BS",
    year: "1st Year",
  },
  {
    title: "Business Economics Past Question 2080",
    subject: "Business Economics",
    examYear: "2080 BS",
    year: "1st Year",
  },
  {
    title: "Business Law Past Question 2079",
    subject: "Business Law",
    examYear: "2079 BS",
    year: "1st Year",
  },
  {
    title: "Business Mathematics Past Question 2078",
    subject: "Business Mathematics",
    examYear: "2078 BS",
    year: "1st Year",
  },
  {
    title: "English Business Communication 2077",
    subject: "Business Communication",
    examYear: "2077 BS",
    year: "1st Year",
  },

  // 2nd Year
  {
    title: "Cost Accounting Past Question 2080",
    subject: "Cost Accounting",
    examYear: "2080 BS",
    year: "2nd Year",
  },
  {
    title: "Macroeconomics Past Question 2079",
    subject: "Macroeconomics",
    examYear: "2079 BS",
    year: "2nd Year",
  },
  {
    title: "Business Statistics Past Question 2080",
    subject: "Business Statistics",
    examYear: "2080 BS",
    year: "2nd Year",
  },
  {
    title: "Company Law Past Question 2078",
    subject: "Company Law",
    examYear: "2078 BS",
    year: "2nd Year",
  },
  {
    title: "Business Finance Past Question 2077",
    subject: "Business Finance",
    examYear: "2077 BS",
    year: "2nd Year",
  },

  // 3rd Year
  {
    title: "Financial Management Past Question 2080",
    subject: "Financial Management",
    examYear: "2080 BS",
    year: "3rd Year",
  },
  {
    title: "Advanced Accounting Past Question 2079",
    subject: "Advanced Accounting",
    examYear: "2079 BS",
    year: "3rd Year",
  },
  {
    title: "Tax Law Past Question 2080",
    subject: "Tax Law",
    examYear: "2080 BS",
    year: "3rd Year",
  },
  {
    title: "Marketing Management Past Question 2078",
    subject: "Marketing Management",
    examYear: "2078 BS",
    year: "3rd Year",
  },
  {
    title: "Development Economics Past Question 2077",
    subject: "Development Economics",
    examYear: "2077 BS",
    year: "3rd Year",
  },

  // 4th Year
  {
    title: "Auditing Past Question 2080",
    subject: "Auditing",
    examYear: "2080 BS",
    year: "4th Year",
  },
  {
    title: "Investment Analysis Past Question 2079",
    subject: "Investment Analysis",
    examYear: "2079 BS",
    year: "4th Year",
  },
  {
    title: "Labour Law Past Question 2080",
    subject: "Labour Law",
    examYear: "2080 BS",
    year: "4th Year",
  },
  {
    title: "Operations Research Past Question 2078",
    subject: "Operations Research",
    examYear: "2078 BS",
    year: "4th Year",
  },
  {
    title: "International Economics Past Question 2077",
    subject: "International Economics",
    examYear: "2077 BS",
    year: "4th Year",
  },
];

function handleDownload() {
  toast.info("Download coming soon!", {
    description: "PDF download will be available shortly.",
  });
}

export function PastQuestions() {
  const [activeYear, setActiveYear] = useState<Year>("1st Year");

  const filtered = papers.filter((p) => p.year === activeYear);

  return (
    <main className="min-h-screen">
      <section className="bg-hero py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link to="/" data-ocid="pq.back.link">
              <ArrowLeft size={14} className="mr-1" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <HelpCircle size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                BBS Past Questions
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Practice with real exam questions from 2075 to 2080 BS
                (Tribhuvan University).
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
                data-ocid={`pq.year.${y.replace(" ", "_").toLowerCase()}.tab`}
              >
                {y}
              </button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Note: These are collected from previous Tribhuvan University
            examinations.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} papers available for {activeYear}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
                data-ocid={`pq.item.${i + 1}`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200">
                    Past Question
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {p.examYear}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {p.subject}
                  </p>
                </div>
                <div className="mt-auto pt-2 border-t border-border">
                  <Button
                    size="sm"
                    className="h-7 text-xs gap-1 w-full"
                    onClick={handleDownload}
                    data-ocid={`pq.download_button.${i + 1}`}
                  >
                    <Download size={12} /> Download PDF
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
