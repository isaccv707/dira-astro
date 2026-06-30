/**
 * Utility to optimize Cloudinary URLs with automatic format, quality, and specific dimensions.
 */
export const getCloudinaryUrl = (
  url: string | undefined,
  {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
  }: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    crop?: string;
  } = {},
): string => {
  if (!url) return "";

  // If it's not a Cloudinary URL, return as is
  if (!url.includes("cloudinary.com")) return url;

  // Cloudinary URL pattern: .../upload/[transformations]/v12345678/public_id.jpg
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const baseUrl = url.substring(0, uploadIndex + 8); // Include '/upload/'
  const remainingUrl = url.substring(uploadIndex + 8);

  // Filter out any existing transformations if they exist (simple check for starting with 'v' for version)
  // Most raw URLs from APIs look like .../upload/v1/public_id.jpg

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    crop ? `c_${crop}` : "",
    "dpr_auto",
  ]
    .filter(Boolean)
    .join(",");

  return `${baseUrl}${transformations}/${remainingUrl}`;
};

/**
 * Generates a responsive srcset for Cloudinary images.
 * Pass `ratio` to request a specific aspect crop at every width (e.g. { w: 4, h: 5 } for portrait mobile).
 */
export const getCloudinarySrcSet = (
  url: string | undefined,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  ratio?: { w: number; h: number },
): string => {
  if (!url || !url.includes("cloudinary.com")) return "";

  return widths
    .map((w) => {
      const height = ratio ? Math.round((w * ratio.h) / ratio.w) : undefined;
      return `${getCloudinaryUrl(url, { width: w, height })} ${w}w`;
    })
    .join(", ");
};
