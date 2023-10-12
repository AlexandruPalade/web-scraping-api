import { Request, Response } from "express";
import { scrapeWebsite } from "../service/functions";
import { ERRORS } from "../const/errors";
import { config } from "../const/config";

export default class ScrapeController {
  static async startScrape(req: Request, res: Response) {
    const url: string = req.body.url;

    try {
      const url: string = req.body.url;

      if (!url) {
        return res.status(400).send(ERRORS.URL_REQUESTED);
      }

      if (!config.urlRegex.test(url)) {
        return res.status(400).send(ERRORS.BAD_URL);
      }

      const scrapedData = await scrapeWebsite(url);

      res.json(scrapedData);
    } catch (error) {
      res.status(500).send(ERRORS.SERVER_ERROR);
    }
  }
}
