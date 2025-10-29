import image from '../../assets/imageExample.png';
import imageTwo from '../../assets/image.png';

interface CarouselHome {
    img?: ImageMetadata,
    text: string;
}

export const carouselHomeData: CarouselHome[] = [
    { img: image, text: 'Primera imagen' },
    { img: imageTwo, text: 'Primera imagen' },
    { img: image, text: 'Primera imagen' },
    { img: imageTwo, text: 'Primera imagen' },
]