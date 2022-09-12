"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.getPosts = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                };
                const response = await this.postBusiness.getPosts(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
        this.createPost = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    content: req.body.content
                };
                const response = await this.postBusiness.createPost(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
        this.deletePost = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id
                };
                const response = await this.postBusiness.deletePost(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
        this.likePost = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id
                };
                const response = await this.postBusiness.likePost(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
        this.deslikePost = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id
                };
                const response = await this.postBusiness.deslikePost(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
        this.editPost = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id,
                    content: req.body.content
                };
                const response = await this.postBusiness.editPost(input);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        };
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map