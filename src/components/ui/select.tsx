"use client"

import { Select as SelectPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import type { ElementType } from "react"

interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  icon?: ElementType
}

function Select({
  ...props
}: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  icon: Icon,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  icon?: ElementType
}) {
  return (
    <div
      aria-invalid={props['aria-invalid']}
      aria-disabled={props.disabled}
      className={cn(
        'flex h-14 w-full items-center gap-2 rounded-lg border border-input bg-primary-foreground px-3 py-2 shadow-sm',
        'aria-invalid:border-red-400',
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        'focus-within:border-primary/50 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary',
      )}
    >
      {Icon && <Icon className="size-6 text-card-foreground" />}
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "flex flex-1 items-center justify-between bg-transparent text-base text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-6 text-card-foreground shrink-0" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </div>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 rounded-lg border border-input shadow-lg ring-1 duration-100 relative z-50 overflow-hidden",
          "w-[var(--radix-select-trigger-width)] max-h-[300px]",
          className
        )}
        position={position}
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className="p-1 w-full"
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-medium", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground gap-2 rounded-md py-2.5 pr-8 pl-2 text-base relative flex w-full cursor-pointer items-center outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 transition-colors",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1">{children}</SelectPrimitive.ItemText>
      <span className="pointer-events-none absolute right-2 flex size-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-5" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
