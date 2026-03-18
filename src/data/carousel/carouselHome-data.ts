
import image1 from '../../assets/images/home/carousel/2A.jpg';
import image2 from '../../assets/images/home/carousel/2B.jpg';
import image3 from '../../assets/images/home/carousel/2C.jpg';

interface Carousel {
    img: ImageMetadata
}

export const carouselHomeData: Carousel[] = [
    {
        img: image1,
    },
    {
        img: image2,
    },
    {
        img: image3,
    }
];