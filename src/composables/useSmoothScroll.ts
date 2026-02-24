

import Lenis from 'lenis'
import { onMounted, onBeforeUnmount } from 'vue'

export function useSmoothScroll() {
  let lenis: Lenis | null = null
  let rafId: number | null = null

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    })

    const raf = (time: number) => {
      lenis!.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const revealEls = document.querySelectorAll('.reveal-item')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    revealEls.forEach((el) => io.observe(el))
  })

  onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  })
}