import { PostDatabase } from "../database/PostDatabase"
import { ICreatePostDTO, IDeletePostInputDTO, IDislikePostInputDTO, IEditPostInputDTO, IGetPosts, IGetPostsInputDTO, IGetPostsOutputDTO, ILikeDB, ILikePostInputDTO, IPostDB, Post } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private hasManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public getPosts = async (input: IGetPostsInputDTO) => {
        const token = input.token

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido/ausente.")
        }

        const postsDB = await this.postDatabase.getPosts()

        const posts = postsDB.map(postDB  => {
            return new Post (
                postDB.id,
                postDB.content,
                postDB.user_id
            )
        })
    
        for(let post of posts){
            const likes:any = await this.postDatabase.getLikes(post.getId())

            post.setLikes(likes)
        }

        const response = {
            posts
        }

        return response
    }

    public createPost = async (input: ICreatePostDTO) => {
        const token = input.token
        const content = input.content

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido/ausente.")
        }

        if (!content) {
            throw new Error("Parâmetro ausente.");
        }

        if (content.length < 1) {
            throw new Error("Parâmetro 'content' inválido.");
        }

        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            content,
            payload.id
        )

        await this.postDatabase.createPost(post)

        const response = {
            message: "Post publicado!"
        }

        return response
    }

    public deletePost = async (input: IDeletePostInputDTO) => {
        const token = input.token
        const id = input.id

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido/ausente.")
        }

        const findPost = await this.postDatabase.findPostById(id)

        if (!findPost) {
            throw new Error("Post não encontrado.")
        }

        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== findPost.user_id) {
                throw new Error("Somente admins podem deletar posts de outros usuários.");
            }
        }

        await this.postDatabase.deletePost(id)

        const response = {
            message: "Post deletado com sucesso!"
        }

        return response
    }

    public likePost = async (input: ILikePostInputDTO) => {
        const token = input.token
        const id = input.id

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido/ausente.")
        }

        const findPostById = await this.postDatabase.findPostById(id)

        if(!findPostById){
            throw new Error("Post não encontrado.");
        }

        const findLikePost = await this.postDatabase.findLikePost(id, payload.id)

        if (findLikePost) {
            throw new Error("Você já curtiu esse post.");
        }

        const idPost = this.idGenerator.generate()

        const newLike: ILikeDB = {
            id : idPost,
            post_id : id,
            user_id : payload.id
        }
        
        await this.postDatabase.likePost(newLike)

        const response = {
            message: "Post curtido!"
        }

        return response

    }

    public deslikePost = async (input: IDislikePostInputDTO) => {
        const token = input.token
        const id = input.id

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido/ausente.")
        }

        const findPostById = await this.postDatabase.findPostById(id)

        if(!findPostById){
            throw new Error("Post não encontrado.");
        }

        const findLikePost = await this.postDatabase.findLikePost(id, payload.id)

        if (!findLikePost) {
            throw new Error("Você não curtiu esse post.");
        }

        await this.postDatabase.deslikePost(id)

        const response = {
            message: "Post descurtido!"
        }

        return response
    }


    public editPost = async (input: IEditPostInputDTO) => {
        const token = input.token
        const id = input.id
        const content = input.content

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido/ausente.")
        }

        const findPostById = await this.postDatabase.findPostById(id)

        if(!findPostById){
            throw new Error("Post não encontrado.");
        }

        if(!content){
            throw new Error("Parâmetro ausente.")
        }

        if(content.length < 1 || typeof content !== "string"){
            throw new Error("Parâmetro inválido.")
        }

        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== findPostById.user_id) {
                throw new Error("Somente admins podem editar posts de outros usuários.");
            }
        }

        const updatePost : IPostDB = {
            id: id,
            content: content,
            user_id: payload.id
        }

        await this.postDatabase.editPost(updatePost)

        const response = {
            message: "Edição realizada com sucesso!"
        }

        return response
    }
}