import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-button ring-offset-background transition-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant",
        primary: "bg-primary-600 text-white hover:bg-primary-700 active:scale-98 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        secondary: "border-2 border-white text-white hover:bg-white hover:text-primary-600 active:scale-98 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "btn-gradient shadow-leaf rounded-leaflet focus-ring",
        luxury:  "bg-[#0F2A1D] text-[#E3EED4] hover:bg-[#0B2016] focus:ring-2 focus:ring-ring",
        minimal: "btn-outline rounded-leaflet hover:bg-neutral100/30 focus-ring",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 rounded-md px-4 text-sm",
        lg: "h-14 rounded-lg px-8 text-base",
        xl: "h-16 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
