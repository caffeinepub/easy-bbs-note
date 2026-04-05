import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface ExamTipCardProps {
  tip: { title: string; content: string; subject: string; tags: string[] };
  index?: number;
}

export function ExamTipCard({ tip, index = 1 }: ExamTipCardProps) {
  return (
    <article
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-3"
      data-ocid={`examtip.item.${index}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-snug">
            {tip.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{tip.subject}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {tip.content}
      </p>
      {tip.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-border">
          {tip.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
