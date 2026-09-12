import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { useSlideReveal } from "@/hooks/use-slide-reveal"
import { cn } from "@/lib/utils"

export function SlideImage({
  src,
  alt,
  className,
  fit = "cover",
}: {
  src: string
  alt: string
  className?: string
  fit?: "cover" | "contain"
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.08] bg-black/30",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full",
          fit === "contain" ? "object-contain" : "object-cover object-center",
        )}
        draggable={false}
      />
    </div>
  )
}

export function ImageWithCaptions({
  src,
  alt,
  captions,
  fit = "cover",
  className,
}: {
  src: string
  alt: string
  captions: { label: string; accent?: "primary" | "heat" | "electric" }[]
  fit?: "cover" | "contain"
  className?: string
}) {
  const accents = {
    primary: "border-primary/30 bg-background/85 text-primary",
    heat: "border-heat/30 bg-background/85 text-heat",
    electric: "border-electric/30 bg-background/85 text-electric",
  }
  return (
    <div className={cn("relative h-full min-h-0", className)}>
      <SlideImage src={src} alt={alt} fit={fit} className="h-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-3 pt-10">
        {captions.map((caption) => (
          <div
            key={caption.label}
            className={cn(
              "rounded-lg border px-2 py-2 text-center text-sm font-semibold leading-snug backdrop-blur-sm",
              accents[caption.accent ?? "primary"],
            )}
          >
            {caption.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Reveal({
  at,
  children,
  keepSpace = false,
  className,
}: {
  at: number
  children: ReactNode
  keepSpace?: boolean
  className?: string
}) {
  const { step } = useSlideReveal()
  if (step < at) {
    if (!keepSpace) return null
    return (
      <div className={cn("invisible", className)} aria-hidden>
        {children}
      </div>
    )
  }
  return <div className={cn("animate-slide-up", className)}>{children}</div>
}

export function HighlightBox({
  title,
  children,
  variant = "primary",
}: {
  title?: string
  children: ReactNode
  variant?: "primary" | "heat" | "electric" | "muted"
}) {
  const variants = {
    primary: "border-primary/25 bg-primary/[0.06]",
    heat: "border-heat/25 bg-heat/[0.08]",
    electric: "border-electric/25 bg-electric/[0.08]",
    muted: "border-white/[0.08] bg-white/[0.02]",
  }
  return (
    <div className={cn("rounded-xl border p-5", variants[variant])}>
      {title && (
        <h3 className="mb-3 text-xl font-semibold tracking-tight">{title}</h3>
      )}
      <div className="text-lg leading-relaxed text-foreground/90">{children}</div>
    </div>
  )
}

export function BigPrompt({
  lines,
  align = "left",
}: {
  lines: string[]
  align?: "left" | "center"
}) {
  return (
    <div className={cn("space-y-5", align === "center" && "text-center")}>
      {lines.map((line) => (
        <p
          key={line}
          className="text-balance text-3xl font-semibold leading-snug text-foreground sm:text-4xl"
        >
          {line}
        </p>
      ))}
    </div>
  )
}

export function NumberedItems({
  items,
  columns = 1,
}: {
  items: string[]
  columns?: 1 | 2
}) {
  return (
    <ol
      className={cn(
        "grid gap-4",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-4"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-lg font-bold tabular-nums text-primary">
            {i + 1}
          </span>
          <span className="text-xl leading-snug text-foreground/90">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function BuildingZones({
  zones,
}: {
  zones: { label: string; hint: string }[]
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08]">
      <div className="bg-[#2a3340] px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider text-white/60">
        Tető és homlokzat
      </div>
      <div className="grid sm:grid-cols-5">
        {zones.map((zone, i) => (
          <div
            key={zone.label}
            className={cn(
              "border-white/[0.06] px-3 py-5",
              i > 0 && "sm:border-l",
              i % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.015]",
            )}
          >
            <p className="text-lg font-semibold leading-snug">{zone.label}</p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              {zone.hint}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function IconTile({
  icon: Icon,
  label,
  hint,
  accent = "primary",
}: {
  icon: LucideIcon
  label: string
  hint?: string
  accent?: "primary" | "heat" | "electric" | "renewable"
}) {
  const accents = {
    primary: "text-primary border-primary/20 bg-primary/[0.06]",
    heat: "text-heat border-heat/20 bg-heat/[0.08]",
    electric: "text-electric border-electric/20 bg-electric/[0.08]",
    renewable: "text-renewable border-renewable/20 bg-renewable/[0.08]",
  }
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-4",
        accents[accent].split(" ").slice(1).join(" "),
      )}
    >
      <Icon className={cn("mb-3 h-7 w-7", accents[accent].split(" ")[0])} />
      <p className="text-lg font-semibold leading-snug">{label}</p>
      {hint && (
        <p className="mt-1 text-base leading-snug text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

export function BuildingScene({
  mode = "lit",
  className,
}: {
  mode?: "lit" | "outage"
  className?: string
}) {
  const lit = mode === "lit"
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border",
        lit
          ? "border-heat/25 bg-gradient-to-b from-sky-950/70 via-[#1a2230] to-[#121820]"
          : "border-white/10 bg-gradient-to-b from-[#07080c] via-[#0c1016] to-[#08090c]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2",
          lit
            ? "bg-gradient-to-b from-orange-300/15 to-transparent"
            : "bg-gradient-to-b from-slate-500/5 to-transparent",
        )}
      />
      <svg
        viewBox="0 0 360 220"
        className="relative h-full w-full"
        aria-hidden
      >
        <rect
          x="28"
          y="168"
          width="304"
          height="14"
          fill={lit ? "#2a3340" : "#161a20"}
        />
        <path
          d="M70 92 L180 38 L290 92 V168 H70 Z"
          fill={lit ? "#3b4656" : "#1c222c"}
        />
        <polygon
          points="70,92 180,38 290,92 276,92 180,52 84,92"
          fill={lit ? "#5c3a2a" : "#241812"}
        />
        <rect
          x="96"
          y="100"
          width="168"
          height="68"
          fill={lit ? "#2c3544" : "#141920"}
        />
        {[0, 1, 2, 3].map((col) =>
          [0, 1].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={110 + col * 36}
              y={110 + row * 24}
              width="22"
              height="16"
              rx="1"
              fill={lit ? "#f3c36a" : "#0d1116"}
              opacity={lit ? 0.92 : 1}
            />
          )),
        )}
        <rect
          x="168"
          y="136"
          width="24"
          height="32"
          fill={lit ? "#1b222c" : "#0c1014"}
        />
        <circle
          cx="300"
          cy="36"
          r="14"
          fill={lit ? "#f4d7a0" : "#3a4150"}
          opacity={lit ? 0.85 : 0.35}
        />
      </svg>
      <p className="absolute bottom-2 left-3 text-xs font-medium uppercase tracking-wider text-white/50">
        {lit ? "Működő épület" : "Energiaellátás nélkül"}
      </p>
    </div>
  )
}

export function SeasonCurves() {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <svg viewBox="0 0 520 220" className="h-auto w-full" aria-hidden>
        <text x="16" y="22" fill="hsl(215 12% 58%)" fontSize="13">
          Tél
        </text>
        <text x="470" y="22" fill="hsl(215 12% 58%)" fontSize="13">
          Nyár
        </text>
        <line
          x1="24"
          y1="190"
          x2="500"
          y2="190"
          stroke="hsl(224 14% 28%)"
          strokeWidth="1"
        />
        <path
          d="M24 48 C 90 42, 150 70, 200 110 S 320 188, 400 176 S 480 90, 500 58"
          fill="none"
          stroke="hsl(var(--heat))"
          strokeWidth="4"
        />
        <path
          d="M24 176 C 90 168, 150 150, 220 96 S 340 40, 410 48 S 480 88, 500 110"
          fill="none"
          stroke="hsl(var(--electric))"
          strokeWidth="4"
        />
        <circle cx="70" cy="46" r="5" fill="hsl(var(--heat))" />
        <circle cx="430" cy="52" r="5" fill="hsl(var(--electric))" />
      </svg>
      <div className="mt-2 flex flex-wrap gap-5 text-sm">
        <span className="inline-flex items-center gap-2 text-heat">
          <span className="h-0.5 w-6 bg-heat" />
          Fűtési igény
        </span>
        <span className="inline-flex items-center gap-2 text-electric">
          <span className="h-0.5 w-6 bg-electric" />
          Napenergia-termelés
        </span>
      </div>
    </div>
  )
}

export function FlowRow({
  source,
  converter,
  output,
  extra,
}: {
  source: string
  converter: string
  output: string
  extra?: string
}) {
  return (
    <div className="grid items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <FlowNode label={source} />
      <span className="hidden text-center text-primary sm:block">→</span>
      <FlowNode label={converter} emphasis />
      <span className="hidden text-center text-primary sm:block">→</span>
      <div className="space-y-1">
        <FlowNode label={output} />
        {extra && (
          <p className="text-center text-sm text-electric">{extra}</p>
        )}
      </div>
    </div>
  )
}

function FlowNode({
  label,
  emphasis = false,
}: {
  label: string
  emphasis?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-center text-base font-medium leading-snug",
        emphasis
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-white/10 bg-white/[0.03]",
      )}
    >
      {label}
    </div>
  )
}

export function TimerHero({
  times,
  questions,
}: {
  times: number[]
  questions: string[]
}) {
  const { step } = useSlideReveal()
  const minutes = times[Math.min(step, times.length - 1)]
  return (
    <div className="grid h-full min-h-0 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col justify-center rounded-xl border border-primary/25 bg-primary/[0.07] px-6 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Hátralévő idő
        </p>
        <p className="mt-2 font-semibold tabular-nums leading-none tracking-tight text-foreground">
          <span className="text-[6.5rem] sm:text-[7.5rem]">{minutes}</span>
          <span className="ml-3 align-middle text-3xl text-muted-foreground">
            {" "}
            perc
          </span>
        </p>
      </div>
      <ul className="space-y-3">
        {questions.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-xl leading-snug"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WorksheetSheet({
  title,
  lines,
}: {
  title: string
  lines: string[]
}) {
  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#f4efe4] px-5 py-5 text-[#2b241c] shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7a6a52]">
        Munkalap
      </p>
      <h3 className="mt-1 text-xl font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">
        {lines.map((line) => (
          <div key={line} className="border-b border-[#2b241c]/15 pb-2">
            <p className="text-sm font-medium">{line}</p>
            <div className="mt-2 h-3 rounded-sm bg-[#2b241c]/8" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function FactorOrbit({ items }: { items: string[] }) {
  const [a, b, c, d, e] = items
  return (
    <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
      <OrbitCard label={a} />
      <OrbitCard label={b} />
      <OrbitCard label={c} />
      <OrbitCard label={d} />
      <div className="flex items-center justify-center rounded-xl border border-primary/30 bg-primary/10 px-4 py-6 text-center">
        <p className="text-2xl font-semibold text-primary">Épület</p>
      </div>
      <OrbitCard label={e} />
    </div>
  )
}

function OrbitCard({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-lg leading-snug">
      {label}
    </div>
  )
}

export function VerdictCard({
  verdict,
  claim,
  reason,
}: {
  verdict: "igaz" | "hamis"
  claim: string
  reason: string
}) {
  const ok = verdict === "igaz"
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-4",
        ok
          ? "border-renewable/25 bg-renewable/[0.08]"
          : "border-destructive/25 bg-destructive/[0.08]",
      )}
    >
      <p
        className={cn(
          "text-sm font-bold uppercase tracking-wider",
          ok ? "text-renewable" : "text-red-400",
        )}
      >
        {ok ? "Igaz" : "Hamis"}
      </p>
      <p className="mt-1 text-lg font-semibold leading-snug">{claim}</p>
      <p className="mt-2 text-base leading-snug text-muted-foreground">{reason}</p>
    </div>
  )
}

export function LevelStack({
  levels,
}: {
  levels: { label: string; value: string }[]
}) {
  return (
    <div className="space-y-3">
      {levels.map((level, i) => (
        <Reveal key={level.label} at={i}>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {level.label}
            </p>
            <p className="mt-1 text-2xl font-semibold leading-snug">
              {level.value}
            </p>
          </div>
          {i < levels.length - 1 && (
            <p className="py-1 text-center text-primary">↓</p>
          )}
        </Reveal>
      ))}
    </div>
  )
}
