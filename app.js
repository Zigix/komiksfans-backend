``
import express from "express";
import AuthService from "./service/AuthService.js";
import ComicService from "./service/ComicService.js";
import UserService from "./service/UserService.js";
import cors from "cors";
import PermissionService from "./service/PermissionService.js";

const app = express();
app.use(cors());
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
});

app.get("/api/admin/users", async (req, res) => {
    try {
        const accessToken = PermissionService.getAccessTokenFromRequest(req);
        if (await PermissionService.hasRoleAdmin(accessToken)) {
            const users = await UserService.getAllUsers();
            res.status(200).json(users).end();
        } else {
            res.status(403).json({ error: "No permission" });
        }
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.patch("/api/admin/users/:id/toggleBlock", async (req, res) => {
    try {
        const accessToken = PermissionService.getAccessTokenFromRequest(req);
        if (await PermissionService.hasRoleAdmin(accessToken)) {
            await UserService.toggleBlock(req.params.id);
            res.status(200).end();
        } else {
            res.status(403).json({ error: "No permission" });
        }
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.delete("/api/admin/users/:id", async (req, res) => {
    try {
        const accessToken = PermissionService.getAccessTokenFromRequest(req);
        if (await PermissionService.hasRoleAdmin(accessToken)) {
            await UserService.deleteUser(req.params.id);
            res.status(200).end();
        } else {
            res.status(403).json({ error: "No permission" });
        }
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.patch("/api/admin/users/:id/upgrade-permission", async (req, res) => {
    try {
        const accessToken = PermissionService.getAccessTokenFromRequest(req);
        if (await PermissionService.hasRoleAdmin(accessToken)) {
            await UserService.upgradePermission(req.params.id);
            res.status(200).end();
        } else {
            res.status(403).json({ error: "No permission" });
        }
    } catch (e) {
        res.status(400).json(e).end();
    }
});


/*
* Comics
*
*/

app.post("/api/comics", async (req, res) => {
    await ComicService.createComic(req.body);
    res.status(201).end();
});

app.get("/api/comics", async (req, res) => {
    const comics = await ComicService.getAllComics();
    res.status(200).json(comics).end();
});

app.get("/api/comics/:id", async (req, res) => {
    try {
        const comic = await ComicService.getComicById(req.params.id);
        res.status(200).json(comic).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
});

app.patch("/api/comics/:id/toggleFavorite", async (req, res) => {

        const accessToken = PermissionService.getAccessTokenFromRequest(req);
        if (await PermissionService.hasRoleUser(accessToken)) {
            const user = await PermissionService.getLoggedUser(accessToken);
            console.log(user.id);
            await UserService.toggleFavorite(user.id, req.params.id);
            res.status(200).end();
        } else {
            res.status(403).json({ error: "No permission" });
        }
    
});

app.get("/api/comics/favorite/get", async (req, res) => {
    try {
        const accessToken = PermissionService.getAccessTokenFromRequest(req);
        if (await PermissionService.hasRoleUser(accessToken)) {
            const user = await PermissionService.getLoggedUser(accessToken);
            const favoriteComics = await UserService.getFavorite(user.id);
            res.status(200).json(favoriteComics).end();
        } else {
            res.status(403).json({ error: "No permission" });
        }
    } catch (e) {
        res.status(400).json(e).end();
    }
})


app.listen(3000, () => "Listening");