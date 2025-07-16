import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTimeBR(iso: string): string {
  const date = new Date(iso)
  return format(date, "dd/MM 'às' HH:mm")
}

export function formatDateBR(iso: string): string {
  const date = new Date(iso)
  return format(date, "dd/MM/yyyy")
}

export function formatCurrencyBR(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}