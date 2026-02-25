import type { Post } from "../../../api/interfaces/post.interface"
import type { PostResponse } from "../../../api/postApi/postApi"
import PostCard from "../../../components/react/cards/PostCard"

export interface PostsProps {
    posts: Post[]
}

const Posts = ({ posts = [] }: PostsProps) => {
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 
              sm:grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3
              xl:grid-cols-4">
                {posts.map((post, index) => (
                    <div key={index} className="h-full">
                        <PostCard
                           post={post}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts
