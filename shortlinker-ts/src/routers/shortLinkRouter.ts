import { shortLinkController } from '../controllers/shortLinkController';
import { Router } from "express";

export const shortLinkRouter = Router();

shortLinkRouter.post("/shortit", new shortLinkController().saveLink)
shortLinkRouter.get("/:link", new shortLinkController().redirectLink);
