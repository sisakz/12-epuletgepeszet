import { createContext, useContext } from "react"

type SlideRevealValue = {
  step: number
  steps: number
}

const SlideRevealContext = createContext<SlideRevealValue>({
  step: 0,
  steps: 0,
})

export const SlideRevealProvider = SlideRevealContext.Provider

export function useSlideReveal() {
  return useContext(SlideRevealContext)
}
