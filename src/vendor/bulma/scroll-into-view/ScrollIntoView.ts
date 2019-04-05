/**
 * V: 0.1.0
 */

export class ScrollIntoView {
  public static attachEvents(): void {
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        const elScrollTo = (e.target as HTMLElement).closest('.js-scroll-to')

        // Check if element clicked is the needed element (or inside it)
        if (elScrollTo !== null) {
          const target = elScrollTo.getAttribute('data-target')
          const elTarget = document.querySelector(target)

          // Only continue if target is found on the page
          if (elTarget instanceof HTMLElement) {
            const offset = ScrollIntoView.getOffset(elScrollTo as HTMLElement)

            e.preventDefault()

            if (offset === 0) {
              // If no offset is given, just scroll to the element
              ScrollIntoView.scrollTo(elTarget)
            } else {
              // If offset is given, "reposition" target element with a given offset so that the scroll gets the position with an offset
              // Read more here: https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far

              // Reposition element
              const pos = elTarget.style.position
              const top = elTarget.style.top
              elTarget.style.position = 'relative'
              elTarget.style.top = `-${offset}px`

              // Let browser scroll to it
              ScrollIntoView.scrollTo(elTarget)

              // Put it back
              elTarget.style.top = top
              elTarget.style.position = pos
            }
          }
        }
      },
      false
    )
  }

  public static scrollTo(elTarget: HTMLElement): void {
    elTarget.scrollIntoView({behavior: 'smooth', block: 'start'})
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
