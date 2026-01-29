import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
// import { useAudio } from "@/hooks/useAudio"; // Commented out until we have sound files

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, onMouseEnter, onClick, ...props }, ref) => {

        // const playHover = useAudio('/sounds/hover.mp3');
        // const playClick = useAudio('/sounds/click.mp3');

        // Base styles
        const baseStyles = "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";

        // Variants
        const variants = {
            primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] border border-transparent hover:border-amber-400/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
            outline: "border border-primary/30 text-primary hover:bg-primary/10 backdrop-blur-sm",
            ghost: "text-foreground/80 hover:text-primary hover:bg-primary/5",
            link: "text-primary hover:underline underline-offset-4 bg-transparent shadow-none border-none p-0 h-auto",
        };

        // Sizes
        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-11 px-6 text-sm",
            lg: "h-14 px-8 text-base",
            icon: "h-12 w-12 p-0 flex items-center justify-center rounded-full aspect-square",
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
            // playHover();
            onMouseEnter?.(e);
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            // playClick();
            onClick?.(e);
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
