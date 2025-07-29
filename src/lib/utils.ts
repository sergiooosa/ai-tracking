import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility for generating random IDs
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Utility for URL validation
export function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Utility for extracting domain from URL
export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

// Utility for delay/sleep
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility for formatting numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Utility for generating gradient text classes
export function getGradientText(variant: 'primary' | 'neon' | 'accent' = 'primary'): string {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent',
    neon: 'bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent',
  };
  return variants[variant];
} 