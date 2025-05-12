import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const mockupVariants = cva(
  "flex relative z-10 overflow-hidden shadow-2xl border border-border/70 dark:border-border/5 dark:border-t-border/15",
  {
    variants: {
      type: {
        mobile: "rounded-[48px] max-w-[350px]",
        responsive: "rounded-md",
      },
    },
    defaultVariants: {
      type: "responsive",
    },
  },
);


function Mockup({ className, type, ...props }) {
  return (
    <div
      data-slot="mockup"
      className={cn(mockupVariants({ type, className }))}
      {...props}
    />
  );
}

const frameVariants = cva(
  "bg-border/50 flex relative z-10 overflow-hidden rounded-2xl dark:bg-border/10",
  {
    variants: {
      size: {
        small: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);


function MockupFrame({ className, size, ...props }) {
  return (
    <div
      data-slot="mockup-frame"
      className={cn(frameVariants({ size, className }))}
      {...props}
    />
  );
}

export { Mockup, MockupFrame };
