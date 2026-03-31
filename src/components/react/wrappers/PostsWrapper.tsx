import type { PostResponse } from "../../../api/postsApi/postApi"
import Posts from "../../../sections/react/blog/Posts-section"
import ReduxProvider from "../../../store/providers/ReduxProvider"





export const PostsWrapper = () => {
    return (
        <ReduxProvider>
            <Posts />
        </ReduxProvider>
    )
}