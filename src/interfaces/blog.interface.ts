
export interface Author {
    name: string;
    avatar: ImageMetadata;
}

export interface ContentBlock {
    type: "paragraph" | "list" | "subtitle" | "quote" | "image";
    content?: string;
    items?: { title?: string; text: string }[];
    src?: string;
    alt?: string;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    author: Author;
    description: string;
    date: string;
    updatedAt?: string;
    tags: string[];
    category: string;
    excerpt: string;
    image?: ImageMetadata | undefined;
    readingTime?: number;
    metaDescription?: string;
    status: "draft" | "published";
    content: ContentBlock[];
}