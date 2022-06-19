``
import express from "express";
import AuthService from "./service/AuthService.js";
import PermissionService from "./service/PermissionService.js";
import UserService from "./service/UserService.js";

const app = express();
app.use(express.json());


app.post("/api/auth/register", async (req, res) => {
    try {
        await AuthService.register(req.body);
        res.status(201).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json(result).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.get("/api/auth/logout", async (req, res) => {
    try {
        await AuthService.logout(req);
        res.status(200).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}) ;

app.get("/api/admin/users", async (req, res) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(users).end();
});

app.patch("/api/admin/users/:id/toggleBlock", async (req, res) => {
    try {
        await UserService.toggleBlock(req.params.id);
        res.status(200).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.delete("/api/admin/users/:id", async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        res.status(200).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.patch("/api/admin/users/:id/upgrade-permission", async (req, res) => {
    try {
        await UserService.upgradePermission(req.params.id);
        res.status(200).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
});







// app.get("/api/users/:username", async (req, res) => {
//     const user = await UserRepository.getUserByUsername(req.params.username);
//     console.log(user);
//     res.json(user).end();
// });


app.listen(3000, () => "Listening");