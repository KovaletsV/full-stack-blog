import React from "react";
import PopularPosts from "../components/PopularPosts";
import PostItem from "../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../redux/features/post/postSlice";

const MainPage = () => {
    const dispatch = useDispatch();
    const { posts, popularPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    if (!posts.length) {
        return (
            <div className="text-xl text-center text-white py-10">
                Post don't exist
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto py-10 ">
            <div className="flex justify-between gap-8 ">
                <div className="flex flex-col gap-10 basis-4/5 ">
                    {posts?.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
                <div className="basis-1/5">
                    <div className="text-xs uppercase text-white">Popular</div>
                    {popularPosts?.map(post => (
                        <PopularPosts key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
