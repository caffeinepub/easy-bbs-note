import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export function About() {
  return (
    <main className="min-h-screen">
      <section className="bg-hero py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <GraduationCap size={32} className="text-primary" />
            </div>
            <h1 className="font-display font-bold text-4xl text-foreground mb-4">
              About BBS Hub Nepal
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              BBS Hub Nepal is a free educational platform built for Bachelor of
              Business Studies students across Nepal. Our mission is to make
              quality study materials accessible to every student, regardless of
              their location or background.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={28} className="text-primary" />,
                title: "Quality Content",
                desc: "All notes, PDFs, and past questions are reviewed and curated by experienced BBS educators and top-performing students.",
              },
              {
                icon: <Users size={28} className="text-primary" />,
                title: "Student Community",
                desc: "Join a growing community of 10,000+ BBS students who share resources, study tips, and support each other.",
              },
              {
                icon: <Target size={28} className="text-primary" />,
                title: "Exam Focused",
                desc: "Every resource is designed to help you perform better in TU and PU board examinations.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6"
                data-ocid={`about.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild data-ocid="about.explore.primary_button">
              <Link to="/resources/$type" params={{ type: "notes" }}>
                Start Exploring <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
