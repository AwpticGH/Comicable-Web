const axios = require("axios");
const cheerio = require("cheerio");
const ExternalUrl = require("../dictionary/ExternalUrl");
const ResponseModel = require("../model/ResponseModel");
const HomeModel = require("../model/home/HomeModel");
const DataModel = require("../model/home/DataModel");

class HomeController {
    static async get() {
        const responseModel = new ResponseModel();

        try {
            await axios({
                url: ExternalUrl.URL,
                method: "get",
                headers: {
                    "User-Agent": "Chrome",
                },
            }).then((result) => {
                const $ = cheerio.load(result.data);
                responseModel.status = 200;

                let dataModel = new DataModel();
                dataModel.trending = [];
                dataModel.latest = [];
                dataModel.mirror = [];

                $(".recommendations .col-xl-2").each((i, el) => {
                    let homeModel = new HomeModel();
                    homeModel.title = $(el).find("h5").text().replace("\n", "").slice(0, -1);
                    homeModel.type = $(el).find(".series-link > span").text().replace("\n", "").slice(0, -1);
                    homeModel.thumbnail = $(el).find("img").attr("src");
                    homeModel.endpoint = $(el)
                        .find(".series-link")
                        .attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);
                    dataModel.trending.push(homeModel.toJSON());
                });
                responseModel.data = dataModel.toJSON();
                responseModel.message = "Successfully Fetched Trending Data";

                $(".latest .col-xl-3").each((i, el) => {
                    let homeModel = new HomeModel();
                    homeModel.title = $(el).find("h5").text().replace("\n", "").slice(0, -1);
                    homeModel.type = $(el).find(".series-link > span").text().replace("\n", "").slice(0, -1);
                    homeModel.thumbnail = $(el).find("img").attr("src");
                    homeModel.endpoint = $(el)
                        .find(".series-link")
                        .attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);
                    dataModel.latest.push(homeModel.toJSON());
                });
                responseModel.data = dataModel.toJSON();
                responseModel.message = "Successfully Fetched Trending and Newest Data";

                $(".recommendations2 .col-xl-2").each((i, el) => {
                    let homeModel = new HomeModel();
                    homeModel.title = $(el).find("h5").text().replace("\n", "").slice(0, -1);
                    homeModel.type = $(el).find(".series-link > span").text().replace("\n", "").slice(0, -1);
                    homeModel.thumbnail = $(el).find("img").attr("src");
                    homeModel.endpoint = $(el)
                        .find(".series-link")
                        .attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);
                    dataModel.mirror.push(homeModel.toJSON());
                });
                responseModel.data = dataModel.toJSON();
                responseModel.message = "Successfully Fetched All Data";
            });
        }
        catch (error) {
            if (responseModel.status === undefined) {
                responseModel.status = 404;
            }
            if (responseModel.message === undefined) {
                responseModel.message = "Failed To Fetch Any Data";
            }
        }
        finally {
            return responseModel.toJSON();
        }
    }
}

module.exports = HomeController;