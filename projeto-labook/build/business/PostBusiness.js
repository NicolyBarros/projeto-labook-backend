"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBusiness = void 0;
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
class PostBusiness {
    constructor(postDatabase, idGenerator, hasManager, authenticator) {
        this.postDatabase = postDatabase;
        this.idGenerator = idGenerator;
        this.hasManager = hasManager;
        this.authenticator = authenticator;
        this.getPosts = async (input) => {
            const token = input.token;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new Error("Token inválido/ausente.");
            }
            const postsDB = await this.postDatabase.getPosts();
            const posts = postsDB.map(postDB => {
                return new Post_1.Post(postDB.id, postDB.content, postDB.user_id);
            });
            for (let post of posts) {
                const likes = await this.postDatabase.getLikes(post.getId());
                post.setLikes(likes);
            }
            const response = {
                posts
            };
            return response;
        };
        this.createPost = async (input) => {
            const token = input.token;
            const content = input.content;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new Error("Token inválido/ausente.");
            }
            if (!content) {
                throw new Error("Parâmetro ausente.");
            }
            if (content.length < 1) {
                throw new Error("Parâmetro 'content' inválido.");
            }
            const id = this.idGenerator.generate();
            const post = new Post_1.Post(id, content, payload.id);
            await this.postDatabase.createPost(post);
            const response = {
                message: "Post publicado!"
            };
            return response;
        };
        this.deletePost = async (input) => {
            const token = input.token;
            const id = input.id;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new Error("Token inválido/ausente.");
            }
            const findPost = await this.postDatabase.findPostById(id);
            if (!findPost) {
                throw new Error("Post não encontrado.");
            }
            if (payload.role === User_1.USER_ROLES.NORMAL) {
                if (payload.id !== findPost.user_id) {
                    throw new Error("Somente admins podem deletar posts de outros usuários.");
                }
            }
            await this.postDatabase.deletePost(id);
            const response = {
                message: "Post deletado com sucesso!"
            };
            return response;
        };
        this.likePost = async (input) => {
            const token = input.token;
            const id = input.id;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new Error("Token inválido/ausente.");
            }
            const findPostById = await this.postDatabase.findPostById(id);
            if (!findPostById) {
                throw new Error("Post não encontrado.");
            }
            const findLikePost = await this.postDatabase.findLikePost(id, payload.id);
            if (findLikePost) {
                throw new Error("Você já curtiu esse post.");
            }
            const idPost = this.idGenerator.generate();
            const newLike = {
                id: idPost,
                post_id: id,
                user_id: payload.id
            };
            await this.postDatabase.likePost(newLike);
            const response = {
                message: "Post curtido!"
            };
            return response;
        };
        this.deslikePost = async (input) => {
            const token = input.token;
            const id = input.id;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new Error("Token inválido/ausente.");
            }
            const findPostById = await this.postDatabase.findPostById(id);
            if (!findPostById) {
                throw new Error("Post não encontrado.");
            }
            const findLikePost = await this.postDatabase.findLikePost(id, payload.id);
            if (!findLikePost) {
                throw new Error("Você não curtiu esse post.");
            }
            await this.postDatabase.deslikePost(id);
            const response = {
                message: "Post descurtido!"
            };
            return response;
        };
        this.editPost = async (input) => {
            const token = input.token;
            const id = input.id;
            const content = input.content;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new Error("Token inválido/ausente.");
            }
            const findPostById = await this.postDatabase.findPostById(id);
            if (!findPostById) {
                throw new Error("Post não encontrado.");
            }
            if (!content) {
                throw new Error("Parâmetro ausente.");
            }
            if (content.length < 1 || typeof content !== "string") {
                throw new Error("Parâmetro inválido.");
            }
            if (payload.role === User_1.USER_ROLES.NORMAL) {
                if (payload.id !== findPostById.user_id) {
                    throw new Error("Somente admins podem editar posts de outros usuários.");
                }
            }
            const updatePost = {
                id: id,
                content: content,
                user_id: payload.id
            };
            await this.postDatabase.editPost(updatePost);
            const response = {
                message: "Edição realizada com sucesso!"
            };
            return response;
        };
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map