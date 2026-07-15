"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowEffect?: boolean;
  withGrid?: boolean;
  withDots?: boolean;
  borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  hoverEffect = true,
  glowEffect = false,
  withGrid = false,
  withDots = false,
  borderColor = "border-neutral-border",
  children,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden rounded-2xl bg-white border p-6 md:p-8 transition-shadow duration-300";
  const hoverStyles = hoverEffect ? "hover:shadow-premium-hover hover:border-slate-300" : "";
  const glowStyles = glowEffect ? "hover:shadow-glow" : "shadow-premium";
  
  const combinedClassName = `${baseStyles} ${borderColor} ${hoverStyles} ${glowStyles} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {withGrid && (
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />
      )}
      {withDots && (
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.6] pointer-events-none" />
      )}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <h3 className={`font-display text-lg md:text-xl font-semibold tracking-tight text-secondary ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <p className={`text-sm text-neutral-muted leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`flex-grow ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`mt-6 pt-4 border-t border-slate-100 flex items-center ${className}`} {...props}>
    {children}
  </div>
);
