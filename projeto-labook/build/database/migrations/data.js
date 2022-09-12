"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likes = exports.posts = exports.users = void 0;
const User_1 = require("../../models/User");
exports.users = [
    {
        id: "101",
        name: "Astrodev",
        email: "astrodev@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC",
        role: User_1.USER_ROLES.ADMIN
    },
    {
        id: "102",
        name: "Fulano",
        email: "fulano@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO",
        role: User_1.USER_ROLES.NORMAL
    },
    {
        id: "103",
        name: "Ciclana",
        email: "ciclana@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i",
        role: User_1.USER_ROLES.NORMAL
    }
];
exports.posts = [
    {
        id: "201",
        content: "Olá, sou novo por aqui!",
        user_id: "101"
    },
    {
        id: "202",
        content: "Bom dia, família!",
        user_id: "102"
    },
    {
        id: "203",
        content: "Receba!",
        user_id: "103"
    }
];
exports.likes = [
    {
        id: "301",
        post_id: "201",
        user_id: "101"
    },
    {
        id: "302",
        post_id: "202",
        user_id: "101"
    },
    {
        id: "303",
        post_id: "203",
        user_id: "101"
    },
    {
        id: "304",
        post_id: "201",
        user_id: "102"
    },
    {
        id: "305",
        post_id: "201",
        user_id: "103"
    },
    {
        id: "306",
        post_id: "202",
        user_id: "103"
    }
];
//# sourceMappingURL=data.js.map