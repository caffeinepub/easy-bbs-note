import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  FileText,
  HelpCircle,
  List,
} from "lucide-react";
import { toast } from "sonner";
import { ResourceCard } from "../components/ResourceCard";

const staticResources: Record<
  string,
  {
    title: string;
    subject: string;
    year: string;
    description: string;
    badge: string;
    badgeColor: string;
  }[]
> = {
  pdf: [
    {
      title: "Business Law PDF",
      subject: "Business Law",
      year: "2nd Year",
      description: "Complete PDF covering all chapters of Business Law.",
      badge: "PDF",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      title: "Financial Accounting PDF",
      subject: "Financial Accounting",
      year: "1st Year",
      description: "Comprehensive financial accounting textbook PDF.",
      badge: "PDF",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      title: "Marketing PDF",
      subject: "Marketing",
      year: "3rd Year",
      description: "Marketing management principles and case studies.",
      badge: "PDF",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      title: "Business Statistics PDF",
      subject: "Statistics",
      year: "2nd Year",
      description: "Statistical methods for business decision making.",
      badge: "PDF",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ],
  solution: [
    {
      title: "Financial Accounting Solutions",
      subject: "Financial Accounting",
      year: "1st Year",
      description: "Step-by-step solutions for accounting problems.",
      badge: "Solution",
      badgeColor: "bg-green-50 text-green-700 border-green-200",
    },
    {
      title: "Business Statistics Solutions",
      subject: "Statistics",
      year: "2nd Year",
      description: "Detailed solutions for statistics numericals.",
      badge: "Solution",
      badgeColor: "bg-green-50 text-green-700 border-green-200",
    },
    {
      title: "Financial Management Solutions",
      subject: "Financial Management",
      year: "3rd Year",
      description: "Solved problems on financial management topics.",
      badge: "Solution",
      badgeColor: "bg-green-50 text-green-700 border-green-200",
    },
  ],
};

const typeInfo: Record<
  string,
  { label: string; description: string; icon: React.ReactNode }
> = {
  pdf: {
    label: "PDFs",
    description: "Downloadable PDF study materials and textbooks.",
    icon: <FileText size={28} className="text-primary" />,
  },
  solution: {
    label: "Solutions",
    description: "Step-by-step solutions for past question papers.",
    icon: <CheckCircle size={28} className="text-primary" />,
  },
  notes: {
    label: "Notes",
    description: "See the Notes page for year-wise notes.",
    icon: <BookOpen size={28} className="text-primary" />,
  },
  pastQuestion: {
    label: "Past Questions",
    description: "See the Past Questions page for exam papers.",
    icon: <HelpCircle size={28} className="text-primary" />,
  },
  syllabus: {
    label: "Syllabus",
    description: "See the Syllabus page for official TU syllabus.",
    icon: <List size={28} className="text-primary" />,
  },
};

export function Resources() {
  const { type } = useParams({ strict: false }) as { type?: string };
  const resources = staticResources[type ?? ""] ?? [];
  const info = typeInfo[type ?? "pdf"] ?? typeInfo.pdf;

  function handleDownload() {
    toast.info("Download will be available soon!", {
      description: "We are working on adding real PDF downloads.",
    });
  }

  return (
    <main className="min-h-screen">
      <section className="bg-hero py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link to="/" data-ocid="resources.back.link">
              <ArrowLeft size={14} className="mr-1" /> Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              {info.icon}
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                {info.label}
              </h1>
              <p className="text-muted-foreground text-sm mt-1 max-w-xl">
                {info.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resources.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="mb-4">
                No resources here yet. Try{" "}
                <Link to="/notes" className="text-primary underline">
                  Notes
                </Link>{" "}
                or{" "}
                <Link to="/past-questions" className="text-primary underline">
                  Past Questions
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resources.map((r, i) => (
                <ResourceCard
                  key={r.title}
                  {...r}
                  onDownload={handleDownload}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
