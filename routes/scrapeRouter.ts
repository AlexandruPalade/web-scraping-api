import { Router } from "express";
import ScrapeController from "../controllers/Scrape.controller";

export const router = Router();

router.route("/scrape").post(ScrapeController.startScrape);

export default router;
