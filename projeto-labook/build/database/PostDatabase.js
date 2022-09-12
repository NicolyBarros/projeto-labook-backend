"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getPosts = async () => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select();
            return result;
        };
        this.getLikes = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_LIKES)
                .select()
                .count("id")
                .where({ post_id: id });
            return result[0]["count(`id`)"];
        };
        this.createPost = async (input) => {
            const postDB = {
                id: input.getId(),
                content: input.getContent(),
                user_id: input.getUserId()
            };
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .insert(postDB);
        };
        this.deletePost = async (id) => {
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .delete()
                .where("post_id", "=", `${id}`);
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .delete()
                .where({ id });
        };
        this.findPostById = async (id) => {
            const postDB = await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select()
                .where({ id });
            return postDB[0];
        };
        this.likePost = async (input) => {
            const newLikeDB = {
                id: input.id,
                post_id: input.post_id,
                user_id: input.user_id
            };
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .insert(newLikeDB);
        };
        this.findLikePost = async (id, userId) => {
            const postLikeDB = await BaseDatabase_1.BaseDatabase
                .connection("Labook_Likes")
                .select()
                .where("user_id", "=", `${userId}`)
                .andWhere("post_id", "=", `${id}`);
            return postLikeDB[0];
        };
        this.deslikePost = async (id) => {
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .delete()
                .where("post_id", "=", `${id}`);
        };
        this.editPost = async (post) => {
            const postDB = {
                id: post.id,
                content: post.content,
                user_id: post.user_id
            };
            await BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .update(postDB)
                .where({ id: post.id });
        };
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.TABLE_POSTS = "Labook_Posts";
PostDatabase.TABLE_LIKES = "Labook_Likes";
//# sourceMappingURL=PostDatabase.js.map