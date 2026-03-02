import type { PostResponse } from "../../../api/postApi/postApi"
import Posts from "../../../sections/react/blog/Posts"
import ReduxProvider from "../providers/ReduxProvider"




export const PostsWrapper = () => {
    

    return (
        <ReduxProvider>
            <Posts/>
        </ReduxProvider>
    )
}