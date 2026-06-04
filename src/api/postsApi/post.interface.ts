export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}
export interface ContentBlock {
  id: string;
  type: "SUBTITLE" | "PARAGRAPH" | "LIST" | "IMAGE" | "QUOTE";
  order: number;
  content: string;
  src: string;
  alt: string;
}
export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  image?: ImageMetadata;
  readingTime?: number;
  metaDescription?: string;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  contentBlocks: ContentBlock[];
  authorId: string;
}
export interface PostMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
  totalPages: number;
}

// Esta es la interfaz principal que consume tu fetchGetAllPosts
export interface PostResponse {
  data: Post[];
  meta: PostMeta;
}
