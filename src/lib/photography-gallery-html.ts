/**
 * Post-process exported Webflow gallery markup for performance:
 * - First grid image: eager + fetchpriority high (LCP on /photography)
 * - Rest: lazy + decoding async
 * - Ensure decoding="async" on all imgs
 */
export function optimizePhotographyGalleryHtml(html: string): string {
  let index = 0;
  return html.replace(/<img\b([^>]*)>/gi, (_, rawAttrs: string) => {
    index += 1;
    let attrs = rawAttrs.trim();
    const hasLoading = /\bloading\s*=/i.test(attrs);
    const hasDecoding = /\bdecoding\s*=/i.test(attrs);
    const hasFetchPriority = /\bfetchpriority\s*=/i.test(attrs);

    if (!hasDecoding) {
      attrs = ` decoding="async"${attrs ? ` ${attrs}` : ""}`;
    }

    if (index === 1) {
      if (hasLoading) {
        attrs = attrs.replace(
          /\bloading\s*=\s*["']lazy["']/i,
          'loading="eager"',
        );
      } else {
        attrs = ` loading="eager"${attrs ? ` ${attrs}` : ""}`;
      }
      if (!hasFetchPriority) {
        attrs = ` fetchpriority="high"${attrs ? ` ${attrs}` : ""}`;
      }
    } else {
      if (!hasLoading) {
        attrs = ` loading="lazy"${attrs ? ` ${attrs}` : ""}`;
      }
    }

    return `<img ${attrs}>`;
  });
}
