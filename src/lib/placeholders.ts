// Helper function to generate inline SVG placeholders
export function createPlaceholderSVG(width: number, height: number, text: string = 'Icon'): string {
  return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${width}' height='${height}' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='${Math.max(10, width / 12)}' fill='%23475569'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
}