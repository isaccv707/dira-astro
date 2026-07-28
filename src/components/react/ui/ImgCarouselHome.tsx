import { getCloudinaryUrl } from "../../../utils/cloudinary";

interface ImgCarouselHomeProps {
  imageUrl: string;
  mobileImageUrl?: string;
  isLCP: boolean;
  index: number;
}

const mobileDims = { width: 800, height: 1000 };
const tabletDims = { width: 1400, height: 700 };
const desktopDims = { width: 2000, height: 1000 };

const ImgCarouselHome = ({
  imageUrl,
  mobileImageUrl,
  isLCP,
  index,
}: ImgCarouselHomeProps) => {
  const mobileSrc = mobileImageUrl || imageUrl;

  const finalMobileUrl = getCloudinaryUrl(mobileSrc, mobileDims);
  const finalTabletUrl = getCloudinaryUrl(imageUrl, tabletDims);
  const finalDesktopUrl = getCloudinaryUrl(imageUrl, desktopDims);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <picture>
        {/* Desktop: 2:1 ratio (2000x1000px) */}
        <source
          media="(min-width: 1280px)"
          srcSet={finalDesktopUrl}
          width={desktopDims.width}
          height={desktopDims.height}
        />
        {/* Tablet: 2:1 ratio (1400x700px) */}
        <source
          media="(min-width: 768px)"
          srcSet={finalTabletUrl}
          width={tabletDims.width}
          height={tabletDims.height}
        />
        {/* Mobile: 4:5 ratio (800x1000px) */}
        <img
          src={finalMobileUrl}
          alt={`Banner Informativo DYRA - ${index + 1}`}
          className="w-full h-auto aspect-4/5 md:aspect-2/1 object-cover rounded-clinical-lg transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          loading={isLCP ? "eager" : "lazy"}
          fetchPriority={isLCP ? "high" : "auto"}
          decoding={isLCP ? "sync" : "async"}
          width={mobileDims.width}
          height={mobileDims.height}
        />
      </picture>
    </div>
  );
};

export default ImgCarouselHome;
