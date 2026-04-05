import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({
  size = 32,
  className = "",
  fullPage = false,
}: LoadingSpinnerProps) {
  if (fullPage) {
    return (
      <div
        className="flex items-center justify-center min-h-[300px]"
        data-ocid="loading.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={size}
            className={`animate-spin text-primary ${className}`}
          />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <Loader2
      size={size}
      className={`animate-spin text-primary ${className}`}
      data-ocid="loading.loading_state"
    />
  );
}
