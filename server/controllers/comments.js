import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;

        if (!comment) return res.json({ message: "Write something" });

        const newComment = new Comment({ comment });
        await newComment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment }
        });

        res.json(newComment);
    } catch (error) {
        res.json({ message: "Something wrong in controllers" });
    }
};
