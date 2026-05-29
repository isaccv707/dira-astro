import { SwiperSlide } from "swiper/react";
import Carousel from "../../../components/react/carousel/Carousel";
import NavLinkButton from "../../../components/react/navigation/NavLinkButton";
import type { Post } from "../../../api/interfaces/post.interface";

interface CarouselBlogProps {
  posts: Post[];
}
const CarouselBlog = ({ posts = [] }: CarouselBlogProps) => {
  return (
    <Carousel>
      {posts.map(({ title, image, author, description, slug }, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-full flex flex-col md:flex-row items-center gap-6 
                 bg-white rounded-2xl shadow-md hover:shadow-xl 
                 transition-all duration-500 overflow-hidden"
          >
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 p-4 h-56 sm:h-72 md:h-80">
              <img
                src={image?.src}
                alt={`Imagen del producto ${title}`}
                className="h-full w-auto max-h-full object-contain rounded-lg 
                     transform transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between p-4 sm:p-6 text-center md:text-left h-56 sm:h-72 md:h-80">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  {title}
                </h2>

                {author && (
                  <p className="text-sm text-gray-500 uppercase">
                    Autor:{" "}
                    <span className="text-primary font-semibold">
                      {author.name}
                    </span>
                  </p>
                )}

                <p className="text-sm sm:text-base text-gray-600 line-clamp-4">
                  {description}
                </p>
                <NavLinkButton
                  path={`/blog/${slug}`}
                  text={`Leer sobre ${title}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  // variant="primary"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  );
};

export default CarouselBlog;
