import type { Post } from "../../../api/postsApi/post.interface";
import { getCloudinaryUrl, getCloudinarySrcSet } from "../../../utils/cloudinary";

interface PostCardProps {
  post: Post;
}

/** Blog card: the title is the link; the whole card is clickable through it. */
const PostCard = ({ post }: PostCardProps) => {
  const { image, imageMobile, title, author, description, tags, slug, category } = post;

  // The API returns `image`/`imageMobile` as plain URL strings, not the
  // `ImageMetadata` object the shared Post interface declares — handle both.
  const rawImage = image as unknown as string | ImageMetadata | undefined;
  const imageSrc = typeof rawImage === "string" ? rawImage : rawImage?.src;
  const rawMobileImage = imageMobile as unknown as string | ImageMetadata | undefined;
  const mobileImageSrc =
    typeof rawMobileImage === "string" ? rawMobileImage : rawMobileImage?.src;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-clinical-md border border-ui-border bg-white shadow-xs transition-[border-color,box-shadow] duration-200 hover:border-brand-ink/30 hover:shadow-sm">
      {imageSrc && (
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={getCloudinarySrcSet(imageSrc, [640, 768, 1024], { w: 16, h: 9 })}
          />
          <img
            className="aspect-video h-auto w-full object-cover"
            src={getCloudinaryUrl(mobileImageSrc || imageSrc, { width: 640, height: 360 })}
            alt=""
            loading="lazy"
            width={640}
            height={360}
          />
        </picture>
      )}

      <div className="flex flex-1 flex-col p-6">
        {(category || (tags && tags.length > 0)) && (
          <p className="text-xs font-semibold text-brand-ink">
            {[category, ...(tags ?? []).map((tag) => `#${tag}`)].filter(Boolean).join(" · ")}
          </p>
        )}

        <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-ink">
          <a
            href={`/blog/${slug}`}
            className="rounded-sm after:absolute after:inset-0 group-hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
          >
            {title}
          </a>
        </h3>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{description}</p>
        )}

        <p className="mt-auto flex items-center gap-2 pt-5 text-sm text-ink-muted">
          <img
            src={author.avatar || "/favicon.svg"}
            alt=""
            className="h-10 w-10 rounded-full border border-ui-border bg-ui-bg object-cover"
            loading="lazy"
            width={40}
            height={40}
          />
          {author.name}
        </p>
      </div>
    </article>
  );
};

export default PostCard;
