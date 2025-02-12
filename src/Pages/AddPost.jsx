import React from "react"
import PostForm  from '../Components/PostForm/PostForm'
import { Container } from "../Components"
export default function AddPost(){
    return(
        <div className=" py-8">
            <Container>
                <PostForm></PostForm>
            </Container>

        </div>
    )
}