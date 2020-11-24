// To let TypeScript know that 'share' can be found in 'navigator'
declare const navigator: {
  share?: any
}

export class SocialShare {
  /**
   * Attaches event listener
   */
  public static attachEvents(): void {
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        const elSocialShareButton = (e.target as HTMLElement).closest('.js-social-share')

        // Check if element clicked is the needed element (or inside it)
        if (elSocialShareButton !== null) {
          e.preventDefault()

          if (elSocialShareButton.classList.contains('js-social-share--print')) {
            window.print()
          } else {
            SocialShare.openWindow(elSocialShareButton.getAttribute('href'), 976, 600)
          }
        }
      },
      false
    )

    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        const elNativeSocialShareButton = (e.target as HTMLElement).closest('.js-social-share-native')

        // Check if element clicked is the needed element (or inside it)
        if (elNativeSocialShareButton !== null) {
          e.preventDefault()

          const title = elNativeSocialShareButton.getAttribute('data-share-title')
          const text = elNativeSocialShareButton.getAttribute('data-share-text')
          const url =
            elNativeSocialShareButton.getAttribute('href') || elNativeSocialShareButton.getAttribute('data-share-url')

          // Check if title and url are set
          if (title && text && url && url !== '#') {
            // Check if navigator supports native share
            if (typeof navigator.share !== 'undefined') {
              navigator.share({
                title,
                text,
                url,
              })
            }
          }
        }
      },
      false
    )
  }

  public static openWindow(url: string, winWidth: number, winHeight: number): void {
    const winTop = window.screen.height / 2 - winHeight / 2
    const winLeft = window.screen.width / 2 - winWidth / 2

    window.open(
      url,
      'fw-social-share',
      `top=${winTop},left=${winLeft},status=0,width=${winWidth},height=${winHeight},location=yes,resizable=yes,scrollbars=yes,status=yes`
    )
  }
}
