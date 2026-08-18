import React from "react";
import NavLinkButton from "../navigation/NavLinkButton";
import type { Post } from "../../../api/postsApi/post.interface";
import {
  getCloudinaryUrl,
  getCloudinarySrcSet,
} from "../../../utils/cloudinary";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { image, imageMobile, title, author, description, tags, slug, category } = post;

  // The API returns `image`/`imageMobile` as plain URL strings, not the
  // `ImageMetadata` object the shared Post interface declares — handle both shapes safely.
  const rawImage = image as unknown as string | ImageMetadata | undefined;
  const imageSrc = typeof rawImage === "string" ? rawImage : rawImage?.src;
  const rawMobileImage = imageMobile as unknown as string | ImageMetadata | undefined;
  const mobileImageSrc =
    typeof rawMobileImage === "string" ? rawMobileImage : rawMobileImage?.src;

  return (
    <article className="w-full h-full bg-white border border-ui-border rounded-clinical-md shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container with fixed Aspect Ratio */}
      {imageSrc && (
        <div className="relative aspect-video overflow-hidden">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={getCloudinarySrcSet(imageSrc, [640, 768, 1024], {
                w: 16,
                h: 9,
              })}
            />
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={getCloudinaryUrl(mobileImageSrc || imageSrc, {
                width: 640,
                height: 360,
              })}
              alt={title}
              loading="lazy"
              width={640}
              height={360}
            />
          </picture>
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Category Tag */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-green-primary text-[10px] uppercase tracking-widest font-bold rounded-full shadow-sm">
                {category}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex-1 flex flex-col gap-4">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-green-primary/8 text-green-primary text-[10px] uppercase tracking-wider font-bold rounded-clinical-sm border border-green-primary/15"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xl md:text-2xl font-black tracking-tight text-green-light leading-tight line-clamp-2 group-hover:text-green-primary transition-colors duration-300">
            {title}
          </h2>

          <p className="text-grey-custom text-sm md:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Card Footer - Pushed to bottom with mt-auto */}
        <div className="mt-8 pt-6 border-t border-ui-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={author.avatar || "/favicon.svg"}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-ui-border bg-ui-bg"
                loading="lazy"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-secondary border-2 border-white rounded-full shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold text-green-light leading-none">
                {author.name}
              </p>
              <p className="text-[10px] text-grey-custom/70 uppercase tracking-tighter mt-1">
                Autor(a)
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <NavLinkButton
              path={`/blog/${slug}`}
              text={`Leer más`}
              variant="link"
              size="sm"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
