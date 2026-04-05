import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { ExamTipCard } from "../components/ExamTipCard";

const tips = [
  {
    title: "Analyse Past Questions",
    content:
      "Review past question papers thoroughly to understand exam patterns and frequently asked topics. This is the #1 strategy for scoring high in BBS.",
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
      "Revise notes regularly. Create short summary notes for quick revision before exams. Spaced repetition is scientifically proven to boost memory.",
    subject: "All Subjects",
    tags: ["revision", "study tips"],
  },
  {
    title: "Group Study",
    content:
      "Study in groups to discuss complex topics and clarify doubts. Teaching others is one of the best ways to solidify your own understanding.",
    subject: "All Subjects",
    tags: ["group study", "collaboration"],
  },
  {
    title: "Focus on Definitions",
    content:
      "Many BBS questions ask for definitions. Memorize key terms precisely — examiners reward accurate, concise definitions.",
    subject: "All Subjects",
    tags: ["definitions", "writing tips"],
  },
  {
    title: "Practice Numerical Problems",
    content:
      "For Accounting, Finance and Statistics, daily practice of numerical problems is essential. Don't just read — solve problems every day.",
    subject: "Accounting / Finance",
    tags: ["numericals", "practice"],
  },
  {
    title: "Answer in Points",
    content:
      "Write answers in clear bullet points or numbered lists. Examiners prefer structured answers that are easy to read and mark.",
    subject: "All Subjects",
    tags: ["writing technique", "exam tips"],
  },
  {
    title: "Attempt All Questions",
    content:
      "Never leave a question blank. Even a partial attempt can earn marks. Write what you know — something is always better than nothing.",
    subject: "All Subjects",
    tags: ["exam strategy", "scoring tips"],
  },
];

export function ExamTips() {
  return (
    <main className="min-h-screen">
      <section className="bg-hero py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link to="/" data-ocid="examtips.back.link">
              <ArrowLeft size={14} className="mr-1" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                Exam Tips
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Smart strategies from top BBS students to help you score higher.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-6">
            {tips.length} tips available
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ExamTipCard tip={tip} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
