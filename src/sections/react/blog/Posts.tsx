import PostCard from "../../../components/react/cards/PostCard"
import { posts } from "../../../data/blog/posts"


const Posts = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 
              sm:grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3
              xl:grid-cols-4">
                {posts.map(({ title, description, author, slug, image, tags }) => (
                    <PostCard
                        key={title}
                        title={title}
                        description={description}
                        author={author.name}
                        slug={slug}
                        tags={tags}
                        image={image}
                    />
                ))}
            </div>
        </div>
    )
}

export default Posts
