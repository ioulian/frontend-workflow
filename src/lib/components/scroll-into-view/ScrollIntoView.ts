import 'element-closest/browser'
import smoothscroll from 'smoothscroll-polyfill'

/**
 * Helper method to scroll to a specific DOM element on click
 *
 * Params:
 * - data-target="{selector}" - Selector you want to scroll to, it is passed to "querySelector" function
 * - data-offset="{offset|selector}" - Offset of the scroll position. Positive number will stop sooner of the element
 *   You can also pass a selector to it (if you are using a fixed header for example), this will take this height of the element
 *
 * Example:
 * ```html
 * <a href="#scroll-to-here" data-target="#scroll-to-here" data-offset="20" class="js-scroll-to">
 * <a href="#scroll-to-here" data-target="#scroll-to-here" data-offset="#fixed-header" class="js-scroll-to">
 *
 * <div id="scroll-to-here"></div>
 * ```
 */
export class ScrollIntoView {
  /**
   * Attaches event listener
   *
   * Will listen on all clicks on ".js-scroll-to" with event delegation
   * thus no need to do extra stuff on dynamic content
   */
  public static attachEvents(): void {
    // Polyfill other browsers
    smoothscroll.polyfill()

    if (__EXPOSE_COMPONENTS__) {
      // @ts-ignore
      window.FW = window.FW || {}
      // @ts-ignore
      window.FW.ScrollIntoView = {
        scrollTo: ScrollIntoView.scrollTo,
      }
    }

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
            e.preventDefault()

            const offset = ScrollIntoView.getOffset(elScrollTo as HTMLElement)
            ScrollIntoView.scrollTo(elTarget, offset)
          }
        }
      },
      false
    )
  }

  /**
   * Scrolls to a specific DOM element using smooth scrollIntoView
   *
   * @param {HTMLElement} elTarget Target to scroll to
   * @param {HTMLElement} offset Offset scrolling by number of pixels (useful when using fixed headers)
   */
  public static scrollTo(elTarget: HTMLElement, offset: number = 0): void {
    const elTargetCopy = elTarget

    if (offset === 0) {
      // If no offset is given, just scroll to the element
      elTargetCopy.scrollIntoView({behavior: 'smooth', block: 'start'})
    } else {
      // If offset is given, "reposition" target element with a given offset so that the scroll gets the position with an offset
      // Read more here: https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far

      // Reposition element
      const {position, top} = elTargetCopy.style
      elTargetCopy.style.position = 'relative'
      elTargetCopy.style.top = `-${offset}px`

      // Let browser scroll to it
      elTargetCopy.scrollIntoView({behavior: 'smooth', block: 'start'})

      // Put it back
      elTargetCopy.style.top = top
      elTargetCopy.style.position = position
    }
  }

  /**
   * Calculates an offset or the element you're scrolling to
   *
   * @param {HTMLElement} fromTarget Clicked target to get offset from
   *
   * @returns {number} Offset of the element to scroll to
   */
  public static getOffset(fromTarget: HTMLElement): number {
    const offset = fromTarget.getAttribute('data-offset')

    // If just a number
    const parsedOffset = parseInt(offset, 10)
    if (parseInt(offset, 10) !== 0 && !Number.isNaN(parsedOffset)) {
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
