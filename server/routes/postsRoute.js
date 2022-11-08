import Router from "express";
import {
    createPost,
    getAllPosts,
    getById,
    getMyPosts,
    getPostComments,
    removePost,
    updatePost
} from "../controllers/posts.js";
import { checkAuth } from "../middleware/checkAuth.js";
const router = new Router();

// http://localhost:3001/api/posts

//Create post
// http://localhost:3001/api/posts
router.post("/", checkAuth, createPost);

// Getting all posts
// http://localhost:3001/api/posts
router.get("/", getAllPosts);

// Getting post by id
// http://localhost:3001/api/posts/:id
router.get("/:id", getById);

// Getting posts one author
// http://localhost:3001/api/posts/user/my
router.get("/user/my", checkAuth, getMyPosts);

// Delete post
// http://localhost:3001/api/posts/:id
router.delete("/:id", checkAuth, removePost);

// Update post
// http://localhost:3001/api/posts/:id
router.put("/:id", checkAuth, updatePost);

//Getting post comments
// http://localhost:3001/api/posts/comments/:id
router.get("/comments/:id", getPostComments);

export default router;
