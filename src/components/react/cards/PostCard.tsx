import React from 'react'
import NavLinkButton from '../ui/NavLinkButton';
interface PostCardProps {
    id?: string;
    title: string;
    author: string;
    description: string;
    slug: string;
    image?: ImageMetadata;
    tags?: string[];
}

const PostCard = ({ author, description, slug, title, id, image, tags }: PostCardProps) => {
    return (
        <div
            className="w-full bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
        // styles={"height: 100"}
        >
            {
                image && (
                    <img
                        className="w-full h-48 object-cover rounded-t-2xl"
                        src={image.src}
                        alt={title}
                    />
                )
            }

            <div className="p-6 flex flex-col flex-1 justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-green-ligth leading-snug line-clamp-2">
                        {title}
                    </h1>

                    <p className="text-sm text-yellow-secondary font-bold">
                        Autor: <span className="text-gray-400">{author}</span>
                    </p>

                    <p className="text-gray-500 text-base leading-relaxed line-clamp-3">
                        {description}
                    </p>

                    {
                        tags && tags.length > 0 && (
                            <div>
                                <p className="text-sm text-yellow-secondary font-bold">Etiquetas:</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {tags.map((tag) => (
                                        <div className='bg-green-ligth rounded-2xl'>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-3xl">
                                                {tag}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className="mt-4">
                    <NavLinkButton
                        path={`/blog/${slug}`}
                        text={`Leer más`}
                        variant="link"
                        size="md"
                    />
                </div>
            </div>
        </div>
    )
}

export default PostCard
