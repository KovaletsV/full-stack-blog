import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            });

            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            });

            return res.json(newPostWithImage);
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: "",
            author: req.userId
        });
        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage }
        });
        res.json(newPostWithoutImage);
    } catch (error) {
        res.json({ message: "Something wrong..." });
    }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort("-createdAt");
        const popularPosts = await Post.find().limit(5).sort("-views");

        if (!posts) {
            return res.json({ message: "No posts" });
        }

        res.json({ posts, popularPosts });
    } catch (error) {
        res.json({ message: "Something wrong with getting all posts..." });
    }
};

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.json(post);
    } catch (error) {
        res.json({ message: "Something wrong with getting post by id..." });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const posts = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id);
            })
        );

        res.json(posts);
    } catch (error) {
        res.json({ message: "Something wrong with my posts..." });
    }
};

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.json({ message: "did not find post" });
        }
        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id }
        });

        res.json({ message: "Post was delete" });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body;
        const post = await Post.findById(id);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
            post.imgUrl = fileName || "";
        }

        post.text = text;
        post.title = title;

        await post.save();

        res.json(post);
    } catch (error) {
        console.log(error);
    }
};

// post comment

export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.userId);

        const list = await Promise.all(
            post.comments.map(comment => {
                return Comment.findById(comment._id);
            })
        );

        res.json(list);
    } catch (error) {
        console.log(error);
    }
};
