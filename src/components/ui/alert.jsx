import * as React from "react";
import { cva } from "class-variance-authority";
import {
  InfoCircledIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-start transition-all duration-200 ease-in-out [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground border-gray-200 [&>svg]:text-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:[&>svg]:text-gray-400",
        info: "bg-blue-50 text-blue-900 border-blue-500 [&>svg]:text-blue-600 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-400 dark:[&>svg]:text-blue-400",
        success:
          "bg-green-50 text-green-900 border-green-500 [&>svg]:text-green-600 dark:bg-green-950 dark:text-green-100 dark:border-green-400 dark:[&>svg]:text-green-400",
        warning:
          "bg-yellow-50 text-yellow-900 border-yellow-500 [&>svg]:text-yellow-600 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-400 dark:[&>svg]:text-yellow-400",
        destructive:
          "bg-red-50 text-red-900 border-red-500 [&>svg]:text-red-600 dark:bg-red-950 dark:text-red-100 dark:border-red-400 dark:[&>svg]:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertIcons = {
  info: InfoCircledIcon,
  success: CheckCircledIcon,
  warning: ExclamationTriangleIcon,
  destructive: CrossCircledIcon,
};

function Alert({ className, variant = "default", icon, children, ...props }) {
  const IconComponent = icon || alertIcons[variant] || null;

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        alertVariants({ variant }),
        "hover:shadow-md dark:hover:shadow-lg",
        className
      )}
      {...props}
    >
      {IconComponent && <IconComponent className="shrink-0" />}
      <div className="grid gap-1">{children}</div>
    </div>
  );
}

function AlertTitle({ className, ...props }) {
  return (
    <h4
      data-slot="alert-title"
      className={cn(
        "font-semibold text-base leading-tight tracking-tight text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-gray-600 dark:text-gray-300 [&_p]:leading-relaxedp pb-1 -my-5",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };