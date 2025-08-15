"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline SVG components to avoid import issues
const Sun = ({ className }) => (
  <svg className={className} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.99984 15.5924C12.8124 15.5924 15.0924 13.3124 15.0924 10.4998C15.0924 7.68725 12.8124 5.40723 9.99984 5.40723C7.18726 5.40723 4.90723 7.68725 4.90723 10.4998C4.90723 13.3124 7.18726 15.5924 9.99984 15.5924Z" fill="currentColor"/>
    <g opacity="0.35">
      <path d="M8.47226 2.86078C8.47226 1.98458 9.03301 1.33972 9.90918 1.33333C9.93884 1.33312 9.96909 1.33301 10 1.33301C10.0309 1.33301 10.0612 1.33312 10.0908 1.33333C10.967 1.33972 11.5278 1.98458 11.5278 2.86078C11.5278 3.73702 10.967 4.38184 10.0908 4.38826C10.0612 4.38846 10.0309 4.38857 10 4.38857C9.96909 4.38857 9.93884 4.38846 9.90918 4.38826C9.03301 4.38184 8.47226 3.73697 8.47226 2.86078Z" fill="currentColor"/>
      <path d="M8.47226 18.1382C8.47226 19.0144 9.03301 19.6592 9.90918 19.6656C9.93884 19.6659 9.96909 19.6659 10 19.6659C10.0309 19.6659 10.0612 19.6659 10.0908 19.6656C10.967 19.6592 11.5278 19.0144 11.5278 18.1382C11.5278 17.2619 10.967 16.6171 10.0908 16.6107C10.0612 16.6105 10.0309 16.6104 10 16.6104C9.96909 16.6104 9.93884 16.6105 9.90918 16.6107C9.03301 16.6171 8.47226 17.2619 8.47226 18.1382Z" fill="currentColor"/>
      <path d="M14.3213 4.01763C14.9408 3.39807 15.7933 3.33856 16.4174 3.95362C16.4385 3.97445 16.4599 3.99578 16.4819 4.01763C16.5037 4.03948 16.525 4.06097 16.5459 4.08211C17.1609 4.70615 17.1014 5.55865 16.4819 6.17822C15.8623 6.79778 15.0098 6.85726 14.3857 6.24223C14.3646 6.2214 14.3431 6.20007 14.3213 6.17822C14.2994 6.15637 14.278 6.13488 14.2572 6.11374C13.6422 5.4897 13.7017 4.6372 14.3213 4.01763Z" fill="currentColor"/>
      <path d="M3.51821 14.8214C2.89864 15.4409 2.83914 16.2934 3.45419 16.9174C3.47503 16.9386 3.49636 16.96 3.51821 16.9819C3.54006 17.0038 3.56154 17.0251 3.58269 17.0459C4.20673 17.6609 5.05923 17.6014 5.67879 16.9819C6.29836 16.3624 6.35784 15.5099 5.74281 14.8858C5.72198 14.8647 5.70064 14.8432 5.67879 14.8214C5.65694 14.7994 5.63545 14.7781 5.61432 14.7573C4.99028 14.1423 4.13778 14.2018 3.51821 14.8214Z" fill="currentColor"/>
      <path d="M2.36112 12.0272C1.48492 12.0272 0.840052 11.4664 0.833669 10.5903C0.833452 10.5606 0.833344 10.5303 0.833344 10.4994C0.833344 10.4685 0.833452 10.4383 0.833669 10.4086C0.840052 9.53243 1.48492 8.97168 2.36112 8.97168C3.2373 8.97168 3.88218 9.53243 3.88859 10.4086C3.88879 10.4383 3.8889 10.4685 3.8889 10.4994C3.8889 10.5303 3.88879 10.5606 3.88859 10.5903C3.88218 11.4664 3.2373 12.0272 2.36112 12.0272Z" fill="currentColor"/>
      <path d="M17.6389 12.0272C18.5151 12.0272 19.1599 11.4664 19.1663 10.5903C19.1666 10.5606 19.1667 10.5303 19.1667 10.4994C19.1667 10.4685 19.1666 10.4383 19.1663 10.4086C19.1599 9.53243 18.5151 8.97168 17.6389 8.97168C16.7627 8.97168 16.1178 9.53243 16.1114 10.4086C16.1113 10.4383 16.1111 10.4685 16.1111 10.4994C16.1111 10.5303 16.1113 10.5606 16.1114 10.5903C16.1178 11.4664 16.7627 12.0272 17.6389 12.0272Z" fill="currentColor"/>
      <path d="M3.51821 6.17822C2.89865 5.55865 2.83914 4.70615 3.4542 4.08211C3.47503 4.06097 3.49636 4.03948 3.51821 4.01763C3.54006 3.99578 3.56155 3.97445 3.58269 3.95362C4.20673 3.33856 5.05923 3.39807 5.6788 4.01763C6.29836 4.6372 6.35784 5.4897 5.74281 6.11374C5.72198 6.13488 5.70065 6.15637 5.6788 6.17822C5.65695 6.20007 5.63546 6.2214 5.61432 6.24223C4.99028 6.85726 4.13778 6.79778 3.51821 6.17822Z" fill="currentColor"/>
      <path d="M14.3213 16.9819C14.9408 17.6014 15.7933 17.6609 16.4174 17.0459C16.4385 17.0251 16.4599 17.0038 16.4819 16.9819C16.5037 16.96 16.525 16.9386 16.5459 16.9174C17.1609 16.2934 17.1014 15.4409 16.4819 14.8214C15.8623 14.2018 15.0098 14.1423 14.3857 14.7573C14.3646 14.7781 14.3431 14.7994 14.3213 14.8214C14.2994 14.8432 14.278 14.8647 14.2572 14.8858C13.6422 15.5099 13.7017 16.3624 14.3213 16.9819Z" fill="currentColor"/>
    </g>
  </svg>
);

const Moon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.0002 19C9.0002 19.84 9.1302 20.66 9.3702 21.42C5.5302 20.09 2.6302 16.56 2.3302 12.43C2.0302 8.03999 4.5602 3.93999 8.6502 2.21999C9.7102 1.77999 10.2502 2.09999 10.4802 2.32999C10.7002 2.54999 11.0102 3.07999 10.5702 4.08999C10.1202 5.12999 9.9002 6.22999 9.9002 7.36999C9.9102 9.40999 10.7102 11.3 12.0102 12.75C10.1802 14.21 9.0002 16.47 9.0002 19Z" fill="currentColor"/>
    <path opacity="0.4" d="M21.21 17.72C19.23 20.41 16.09 21.99 12.74 21.99C12.58 21.99 12.42 21.98 12.26 21.97C11.26 21.93 10.29 21.74 9.37 21.42C9.13 20.66 9 19.84 9 19C9 16.47 10.18 14.21 12.01 12.75C13.48 14.4 15.59 15.47 17.92 15.57C18.55 15.6 19.18 15.55 19.8 15.44C20.92 15.24 21.37 15.66 21.53 15.93C21.7 16.2 21.88 16.79 21.21 17.72Z" fill="currentColor"/>
  </svg>
);

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100  dark:data-[state=open]:bg-default-200 
           hover:text-primary text-default-500 dark:text-default-800  rounded-full 
            "
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "p-2 font-medium text-sm text-default-600 cursor-pointer mb-[2px] ",
            {
              "bg-primary text-primary-foreground": theme === "light",
            }
          )}
        >
          <Sun className="w-5 h-5 mr-2" />
          <span className="mr-2">Light</span>
          <Check
            className={cn("w-4 h-4 flex-none ml-auto ", {
              hidden: theme !== "light",
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "p-2 font-medium text-sm text-default-600 hover:bg-primary hover:text-primary-foreground  dark:hover:bg-background cursor-pointer mb-[2px]",
            {
              "bg-primary text-primary-foreground": theme === "dark",
            }
          )}
        >
          <Moon className="w-5 h-5 mr-2" />
          <span className="mr-2">Dark</span>
          <Check
            className={cn("w-4 h-4 flex-none ml-auto text-default-700", {
              hidden: theme !== "dark",
            })}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
