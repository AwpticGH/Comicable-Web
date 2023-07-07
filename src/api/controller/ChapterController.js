const axios = require("axios");
const cheerio = require("cheerio");
const ExternalUrl = require("../dictionary/ExternalUrl");
const ResponseModel = require("../model/ResponseModel");
const DataModel = require("../model/chapter/DataModel");
const PaginationModel = require("../model/chapter/PaginationModel");
const ResponseMessages = require("../dictionary/ResponseMessages");

class ChapterController {
    static async get(request) {
        const series = request.params["series"];
        const chapter = request.params["chapter"];
        const url = `/series/${series}/${chapter}`;
        const responseModel = new ResponseModel();

        try {
            await axios({
                url: `${ExternalUrl.URL}${url}`,
                method: "get",
                headers: {
                    "User-Agent": "Chrome",
                },
            }).then((result) => {
                const $ = cheerio.load(result.data);
                responseModel.status = 200;

                let dataModel = new DataModel();
                dataModel.title = $(".row").find("#chapter-heading").text().split("- ")[1];
                dataModel.images;

                let image;
                $(".read-container").each((i, el) => {
                    image = $(el)
                        .find(".page-break > img")
                        .map((i, el) => $(el).attr("data-src").trim())
                        .get();
                });
                dataModel.images = image;
                responseModel.message = ResponseMessages.PARTIAL;

                let paginationModel = new PaginationModel();
                paginationModel.previous = $(".wp-manga-nav")
                    .find(".nav-previous > a")
                    .attr("href")
                    .replace(ExternalUrl.URL, "/")
                    .slice(0, -1);
                paginationModel.next = $(".wp-manga-nav")
                    .find(".nav-next > a")
                    .attr("href")
                    .replace(ExternalUrl.URL, "/")
                    .slice(0, -1);

                dataModel.pagination = paginationModel.toJSON();
                responseModel.message = ResponseMessages.FULL;

                responseModel.data = dataModel.toJSON();
            });
        }
        catch (error) {
            if (responseModel.status === undefined) {
                responseModel.status = 404;
            }
            if (responseModel.message === undefined) {
                responseModel.message = ResponseMessages.FAIL;
            }
        }
        finally {
            return responseModel.toJSON();
        }
    }
}

module.exports = ChapterController;