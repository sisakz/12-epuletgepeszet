import { useCallback, useEffect, useReducer, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  StickyNote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { slides } from "@/data/slides"
import { SlideRevealProvider } from "@/hooks/use-slide-reveal"
import { cn } from "@/lib/utils"

type DeckState = {
  index: number
  step: number
}

type DeckAction =
  | { type: "next" }
  | { type: "prev" }
  | { type: "jump"; index: number }

function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case "next": {
      const maxStep = slides[state.index].steps ?? 0
      if (state.step < maxStep) return { ...state, step: state.step + 1 }
      if (state.index < slides.length - 1) {
        return { index: state.index + 1, step: 0 }
      }
      return state
    }
    case "prev": {
      if (state.step > 0) return { ...state, step: state.step - 1 }
      if (state.index > 0) {
        const prev = state.index - 1
        return { index: prev, step: slides[prev].steps ?? 0 }
      }
      return state
    }
    case "jump":
      return { index: action.index, step: 0 }
  }
}

export function SlideDeck() {
  const [{ index, step }, dispatch] = useReducer(deckReducer, {
    index: 0,
    step: 0,
  })
  const [fullscreen, setFullscreen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const total = slides.length
  const slide = slides[index]
  const isTitle = slide.variant === "hero"
  const progress = ((index + 1) / total) * 100
  const maxStep = slide.steps ?? 0
  const remaining = Math.max(maxStep - step, 0)

  const go = useCallback((delta: number) => {
    dispatch(delta > 0 ? { type: "next" } : { type: "prev" })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (fullscreen) {
      root.classList.add("deck-fullscreen-active")
      return () => root.classList.remove("deck-fullscreen-active")
    }
    root.classList.remove("deck-fullscreen-active")
  }, [fullscreen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault()
        go(1)
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        go(-1)
      }
      if (e.key === "Home") {
        e.preventDefault()
        dispatch({ type: "jump", index: 0 })
      }
      if (e.key === "End") {
        e.preventDefault()
        dispatch({ type: "jump", index: total - 1 })
      }
      if (e.key === "f" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setFullscreen((f) => !f)
      }
      if (e.key === "n" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setNotesOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, total])

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#050508]",
        fullscreen
          ? "fixed inset-0 z-50 h-screen w-screen overflow-hidden"
          : "min-h-screen p-3 sm:p-5",
      )}
    >
      <div
        className={cn(
          "deck-frame relative flex flex-col overflow-hidden",
          fullscreen ? "deck-frame-fullscreen rounded-none" : "rounded-xl",
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-background">
          <div
            className="slide-glow -left-32 top-0 h-72 w-72 bg-primary"
            style={{ opacity: isTitle ? 0.4 : 0.18 }}
          />
          <div
            className="slide-glow -right-24 bottom-0 h-64 w-64 bg-heat"
            style={{ opacity: 0.1 }}
          />
          <div
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(224 14% 18% / 0.5) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <header className="relative z-10 flex shrink-0 items-center gap-3 border-b border-white/[0.06] bg-background/80 px-4 py-2 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-[10px] font-bold text-primary">
              13.D
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-xs font-medium leading-tight">
                Megújuló energiák · 3–4. óra
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                Épületek energiaigénye
              </p>
            </div>
          </div>

          <div className="mx-auto hidden min-w-0 flex-1 px-3 md:block">
            <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {remaining > 0 && (
              <span className="hidden rounded bg-primary/10 px-2 py-0.5 text-[10px] text-primary sm:inline">
                Még {remaining} lépés
              </span>
            )}
            <span className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setNotesOpen((open) => !open)}
              title="Tanári jegyzet (N)"
            >
              <StickyNote className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setFullscreen((f) => !f)}
              title="Teljes képernyő (F)"
            >
              {fullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </header>

        <main
          className={cn(
            "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden",
            fullscreen ? "px-5 py-4" : "px-6 py-5 sm:px-10 sm:py-8",
          )}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button, a, input")) return
            go(1)
          }}
        >
          <SlideRevealProvider value={{ step, steps: maxStep }}>
            <div
              key={slide.id}
              className={cn(
                "flex h-full min-h-0 flex-col animate-slide-up",
                isTitle && "justify-center",
              )}
            >
              {slide.section && !isTitle && (
                <p className="section-pill mb-4 w-fit sm:mb-5">{slide.section}</p>
              )}

              <h1
                className={cn(
                  "shrink-0 font-semibold tracking-tight text-foreground",
                  isTitle
                    ? "max-w-4xl text-4xl leading-[1.45] sm:text-5xl sm:leading-[1.5] lg:text-[3.25rem] lg:leading-[1.45]"
                    : "mb-5 max-w-5xl text-balance text-3xl leading-snug sm:mb-6 sm:text-4xl lg:text-[2.5rem] lg:leading-snug",
                )}
              >
                {slide.titleDisplay ?? slide.title}
              </h1>

              <div
                className={cn(
                  "min-h-0 flex-1",
                  isTitle ? "mt-8" : "deck-content-scroll",
                )}
              >
                {slide.content}
              </div>
            </div>
          </SlideRevealProvider>
        </main>

        {notesOpen && slide.notes && (
          <div className="relative z-20 border-t border-primary/20 bg-background/95 px-5 py-3 text-base leading-relaxed text-foreground/90">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Tanári jegyzet
            </p>
            {slide.notes}
          </div>
        )}

        <footer
          className={cn(
            "relative z-10 shrink-0 border-t border-white/[0.06] bg-background/80 backdrop-blur-xl",
            fullscreen ? "px-4 py-2" : "px-4 py-3 sm:px-8 sm:py-4",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => go(-1)}
              disabled={index === 0 && step === 0}
              className="h-7 border-white/[0.1] bg-white/[0.03] px-3 text-base hover:bg-white/[0.06] sm:h-9 sm:px-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Előző
            </Button>

            <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => dispatch({ type: "jump", index: i })}
                  aria-label={`${i + 1}. dia: ${s.title}`}
                  title={s.navLabel ?? s.title}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i === index
                      ? "w-5 bg-primary"
                      : "w-1 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>

            <Button
              size="sm"
              onClick={() => go(1)}
              disabled={index === total - 1 && step >= maxStep}
              className="h-7 bg-primary px-3 text-base text-primary-foreground hover:bg-primary/90 sm:h-9 sm:px-4"
            >
              Következő
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
