interface CreatorBadgeProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "light";
}

export function CreatorBadge({ className, size = "md", variant = "default" }: CreatorBadgeProps) {
  const sizeClasses = {
    xs: "h-3 w-3 text-[6px]",
    sm: "h-3.5 w-3.5 text-[7px]",
    md: "h-4 w-4 text-[8px]",
    lg: "h-5 w-5 text-[10px]",
  };

  const variantClasses = {
    default: "bg-[#4287F5] text-white shadow-sm shadow-[#4287F5]/25",
    light: "bg-white/90 text-[#4287F5] shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-black tracking-tight flex-shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className ?? ""}`}
    >
      C
    </span>
  );
}
