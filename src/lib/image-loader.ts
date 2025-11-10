export default function imageLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For absolute URLs (external images), return as is
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // For local images, construct the path with basePath if needed
  const basePath = process.env.NODE_ENV === 'production' ? '/rajath_hegde' : '';
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Add width and quality parameters for local images
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (quality) params.set('q', quality.toString());
  
  const queryString = params.toString();
  return `${basePath}${normalizedSrc}${queryString ? `?${queryString}` : ''}`;
}