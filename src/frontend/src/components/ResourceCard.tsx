import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResourceCardProps {
  title: string;
  subject: string;
  year: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  onDownload: () => void;
  index?: number;
}

export function ResourceCard({
  title,
  subject,
  year,
  description,
  badge = "Notes",
  badgeColor = "bg-blue-50 text-blue-700 border-blue-200",
  onDownload,
  index = 1,
}: ResourceCardProps) {
  return (
    <article
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-3"
      data-ocid={`resource.item.${index}`}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${badgeColor}`}
        >
          {badge}
        </span>
        <span className="text-xs text-muted-foreground">{year}</span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{subject}</p>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
      <div className="mt-auto pt-2 border-t border-border">
        <Button
          size="sm"
          variant="default"
          className="h-7 text-xs gap-1 w-full"
          onClick={onDownload}
          data-ocid={`resource.download_button.${index}`}
        >
          <Download size={12} />
          Download PDF
        </Button>
      </div>
    </article>
  );
}
