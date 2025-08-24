// youtube-scraper.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class YoutubeScraperService {
  async getVideoMetadata(videoId: string) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      const { data: html } = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
        },
      });

      const $ = cheerio.load(html);

      // Extract from HTML <title> tag (includes " - YouTube")
      const rawTitle = $('title').text();
      const title = rawTitle.replace(' - YouTube', '').trim();

      // Extract description from meta tag
      const description =
        $('meta[name="description"]').attr('content') || 'No description';

      return {
        title,
        description,
      };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to scrape video metadata');
    }
  }
}
