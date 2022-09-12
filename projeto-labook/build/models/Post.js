"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, content, userId, likes = 0) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.likes = likes;
        this.getId = () => {
            return this.id;
        };
        this.getContent = () => {
            return this.content;
        };
        this.getUserId = () => {
            return this.userId;
        };
        this.getLikes = () => {
            return this.likes;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setContent = (newContent) => {
            this.content = newContent;
        };
        this.setUserId = (newUserId) => {
            this.userId = newUserId;
        };
        this.setLikes = (newLikes) => {
            this.likes = newLikes;
        };
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map