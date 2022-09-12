"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const PostBusiness_1 = require("../business/PostBusiness");
const PostController_1 = require("../controller/PostController");
const PostDatabase_1 = require("../database/PostDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.postRouter = (0, express_1.Router)();
const postController = new PostController_1.PostController(new PostBusiness_1.PostBusiness(new PostDatabase_1.PostDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator()));
exports.postRouter.get("/", postController.getPosts);
exports.postRouter.post("/", postController.createPost);
exports.postRouter.delete("/:id", postController.deletePost);
exports.postRouter.post("/post/:id", postController.likePost);
exports.postRouter.delete("/post/:id", postController.deslikePost);
exports.postRouter.put("/:id", postController.editPost);
//# sourceMappingURL=postRouter.js.map