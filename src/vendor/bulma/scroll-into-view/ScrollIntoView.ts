export class ScrollIntoView {
  public static attachEvents(): void {
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        const elScrollTo = (e.target as HTMLElement).closest('.js-scroll-to')

        if (elScrollTo !== null) {
          const target = elScrollTo.getAttribute('data-target')
          const elTarget = document.querySelector(target)

          if (elTarget instanceof HTMLElement) {
            const offset = ScrollIntoView.getOffset(elScrollTo as HTMLElement)

            e.preventDefault()

            if (offset === 0) {
              elTarget.scrollIntoView({behavior: 'smooth', block: 'start'})
            } else {
              const pos = elTarget.style.position
              const top = elTarget.style.top
              elTarget.style.position = 'relative'
              elTarget.style.top = `-${offset}px`
              elTarget.scrollIntoView({behavior: 'smooth', block: 'start'})
              elTarget.style.top = top
              elTarget.style.position = pos
            }
          }
        }
      },
      false
    )
  }

  public static getOffset(fromTarget: HTMLElement): number {
    const offset = fromTarget.getAttribute('data-offset')

    // If just a number
    const parsedOffset = parseInt(offset, 10)
    if (parseInt(offset, 10) !== 0 && !isNaN(parsedOffset)) {
      return parseInt(offset, 10)
    }

    // Maybe it's another element (like fixed header)
    const elOffsetTarget = document.querySelector(offset)
    if (elOffsetTarget !== null) {
      return (elOffsetTarget as HTMLElement).offsetHeight
    }

    return 0
  }
}
