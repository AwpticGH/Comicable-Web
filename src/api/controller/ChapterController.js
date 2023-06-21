const axios = require("axios");
const cheerio = require("cheerio");
const ExternalUrl = require("../dictionary/ExternalUrl");
const ResponseModel = require("../model/ResponseModel");
const DataModel = require("../model/chapter/DataModel");
const PaginationModel = require("../model/chapter/PaginationModel");

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
                dataModel.title = $(".row").find("#chapter-heading").text();
                dataModel.images;

                let image;
                $(".read-container").each((i, el) => {
                    image = $(el)
                        .find(".page-break > img")
                        .map((i, el) => $(el).attr("data-src").trim())
                        .get();
                });
                dataModel.images = image;
                responseModel.message = "Successfully Fetched Images";

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

module.exports = ChapterController;