"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--border-radius": "14px",
          "--normal-bg": "#ffffff",
          "--normal-text": "oklch(0.22 0.02 240)",
          "--normal-border": "oklch(0.9 0.01 240)",
          "--success-bg": "#ffffff",
          "--success-text": "oklch(0.42 0.13 145)",
          "--success-border": "oklch(0.88 0.08 145)",
          "--error-bg": "#ffffff",
          "--error-text": "oklch(0.465 0.155 10)",
          "--error-border": "oklch(0.85 0.1 10)",
          "--font-family": "inherit",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
