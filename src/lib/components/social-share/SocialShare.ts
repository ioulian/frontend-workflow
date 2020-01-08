import 'element-closest/browser'

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

          SocialShare.openWindow(elSocialShareButton.getAttribute('href'), 976, 600)
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
