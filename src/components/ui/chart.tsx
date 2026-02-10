"use client"

import * as React from "react"
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from "react"
import {
  Legend as RechartsLegend,
  type LegendProps as RechartsLegendProps,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  type TooltipProps as RechartsTooltipProps,
} from "recharts"
import type {
  ChartConfig,
  ChartContainerProps,
} from "recharts/types/util/types"

import { cn } from "@/lib/utils"

// Chart Container
const ChartContext = createContext<
  {
    config: ChartConfig
  } & ChartContainerProps
>(null!)

function ChartContainer({
  children,
  config,
  className,
  ...props
}: ChartContainerProps) {
  const chartId = useId()
  const id = `chart-${chartId}`

  const contextValue = useMemo(
    () => ({
      id,
      config,
      ...props,
    }),
    [id, config, props]
  )

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        id={id}
        data-chart-container
        className={cn(
          "flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-layer:focus-visible]:outline-none [&_.recharts-polar-grid_[text-anchor=middle]]:fill-muted-foreground [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector[name=other]]:fill-muted [&_.recharts-tooltip-cursor]:stroke-border [&_.recharts-xAxis_line]:stroke-border [&_.recharts-yAxis_line]:stroke-border",
          className
        )}
        {...props}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

// Legend
const ChartLegendContext = createContext<RechartsLegendProps | null>(null!)

function ChartLegend(props: React.ComponentProps<typeof RechartsLegend>) {
  const { payload } = props
  if (payload && payload.length) {
    return (
      <ChartLegendContext.Provider value={props}>
        <RechartsLegend {...props} />
      </ChartLegendContext.Provider>
    )
  }

  return null
}

const ChartLegendContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsLegendProps, "payload" | "verticalAlign">
>(({ className, ...props }, ref) => {
  const { payload, verticalAlign } = useContext(ChartLegendContext)!
  const { config } = useContext(ChartContext)

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-4" : "pt-4",
        className
      )}
      {...props}
    >
      {payload?.map((item) => {
        const itemConfig = config[item.value as keyof typeof config]
        const color = itemConfig?.color || item.color

        return (
          <div
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}
          >
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{
                backgroundColor: color,
              }}
            />
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

// Tooltip
const ChartTooltipContext = createContext<RechartsTooltipProps | null>(null!)

function ChartTooltip({ ...props }: RechartsTooltipProps) {
  return (
    <ChartTooltipContext.Provider value={props}>
      <RechartsTooltip {...props} />
    </ChartTooltipContext.Provider>
  )
}

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsTooltipProps, "label" | "payload"> & {
      indicator?: "line" | "dot" | "dashed"
      hideLabel?: boolean
      hideIndicator?: boolean
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelKey,
      nameKey = "name",
      payload,
    },
    ref
  ) => {
    const { config } = useContext(ChartContext)
    const tooltipLabel = labelKey ? payload?.[0]?.payload[labelKey] : label

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-32 items-start gap-1.5 rounded-lg border bg-background/95 px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!hideLabel && tooltipLabel ? (
          <div className="font-medium">{tooltipLabel}</div>
        ) : null}
        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            const key = `${item.name}-${i}`
            const itemConfig = config[item.name as keyof typeof config]
            const color = itemConfig?.color || item.color

            return (
              <div
                key={key}
                className={cn(
                  "flex items-center gap-2 [&>svg]:text-muted-foreground",
                  indicator === "line" && "flex-row-reverse"
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                      {
                        "bg-transparent": indicator === "dot",
                        "border-2": indicator === "dot",
                        "h-0 border-[1.5px] border-dashed":
                          indicator === "dashed",
                        "w-full": indicator === "line",
                      }
                    )}
                    style={
                      {
                        "--color-bg": color,
                        "--color-border": color,
                      } as React.CSSProperties
                    }
                  />
                )}
                <div
                  className={cn(
                    "flex flex-1 justify-between leading-none",
                    indicator === "line" && "flex-row-reverse"
                  )}
                >
                  <p className="text-muted-foreground">
                    {itemConfig?.label || item.name}
                  </p>
                  <p className="font-mono font-medium">
                    {item.value as React.ReactNode}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
}
