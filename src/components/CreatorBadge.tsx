interface CreatorBadgeProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "light";
}

export function CreatorBadge({ className, size = "md", variant = "default" }: CreatorBadgeProps) {
  const sizeClasses = {
    xs: "h-3 w-3 text-[7px]",
    sm: "h-3.5 w-3.5 text-[8px]",
    md: "h-4 w-4 text-[9px]",
    lg: "h-6 w-6 text-[11px]",
  };

  const variantClasses = {
    default: "bg-primary/15 text-primary",
    light: "bg-white/30 text-white",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-extrabold flex-shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className ?? ""}`}
    >
      C
    </span>
  );
}
