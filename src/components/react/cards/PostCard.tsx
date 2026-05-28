import React from "react";
import NavLinkButton from "../ui/NavLinkButton";
import type { Post } from "../../../api/interfaces/post.interface";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { image, title, author, description, tags, slug } = post;

  return (
    <article className="w-full h-full bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container with fixed Aspect Ratio */}
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={image.src}
            alt={title}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Optional Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-green-light text-[10px] uppercase tracking-widest font-bold rounded-full shadow-sm">
              Blog
            </span>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-green-light/5 text-green-light text-[10px] uppercase tracking-wider font-bold rounded-lg border border-green-light/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xl md:text-2xl font-bold text-green-light leading-tight line-clamp-2 group-hover:text-green-primary transition-colors duration-300">
            {title}
          </h2>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Card Footer - Pushed to bottom with mt-auto */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={author.avatar || "/favicon.svg"}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100 bg-gray-50"
                loading="lazy"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-secondary border-2 border-white rounded-full shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold text-yellow-secondary leading-none">
                {author.name}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">
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
