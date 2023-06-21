const axios = require("axios");
const cheerio = require("cheerio");
const ExternalUrl = require("../dictionary/ExternalUrl");
const ResponseModel = require("../model/ResponseModel");
const DataModel = require("../model/series/DataModel");
const DetailModel = require("../model/series/DetailModel");
const ChaptersModel = require("../model/series/ChaptersModel");

class SeriesController {
    static async get(request) {
        const series = request.params["series"];
        const url = `/series/${series}`;
        let responseModel = new ResponseModel();

        try {
            await axios({
                url: `${ExternalUrl.URL}${url}`,
                method: "get",
                headers: {
                    "User-Agent": "Chrome",
                }
            }).then((result) => {
                const $ = cheerio.load(result.data);
                let dataModel = new DataModel();
                dataModel.chapters = [];

                responseModel.success = 200;

                $(".profile-manga").each((i, el) => {
                    let detailModel = new DetailModel();
                    detailModel.title = $(el).find(".post-title > h1").text().trim();
                    detailModel.alternative = $(el).find(".summary-content").eq(2).text().trim();
                    detailModel.rank = $(el).find(".summary-content").eq(1).text().trim();
                    detailModel.author = $(el).find(".author-content").text().trim();
                    detailModel.artist = $(el).find(".artist-content").text().trim();
                    detailModel.genres = $(el)
                        .find(".genres-content > a")
                        .map((i, el) => $(el).text())
                        .get();
                    detailModel.release = $(el).find(".summary-content").eq(8).text().trim();
                    detailModel.status = $(el).find(".summary-content").eq(9).text().trim();
                    detailModel.synopsis = $(el)
                        .find(".description-summary > .summary__content > p")
                        .text();
                    detailModel.thumbnail = $(el).find("img").attr("data-src");
                    let averageRating = $(el).find("#averagerate").text();
                    let totalRating = $(el).find("#countrate").text();
                    detailModel.rating = `Average ${averageRating} / 5 out of ${totalRating}`;

                    dataModel.detail = detailModel.toJSON();
                });
                responseModel.message = "Successfully Fetched Series Detail";

                $(".wp-manga-chapter").each((i, el) => {
                    let chapterModel = new ChaptersModel();
                    chapterModel.name = $(el).find(".chapter-manhwa-title").text();
                    chapterModel.endpoint = $(el)
                        .find(".chapter-link > a")
                        .attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);

                    dataModel.chapters.push(chapterModel.toJSON());
                });
                responseModel.message = "Successfully Fetched All Data";

                responseModel.data = dataModel.toJSON();
            });
        }
        catch (error) {
            responseModel.status = 404;
            responseModel.message = "Failed To Fetch Data";
        }
        finally {
            return responseModel.toJSON();
        }
    }
}

module.exports = SeriesController;