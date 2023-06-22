const axios = require("axios");
const cheerio = require("cheerio");
const ExternalUrl = require("../dictionary/ExternalUrl");
const ResponseModel = require("../model/ResponseModel");
const DataModel = require("../model/search/DataModel");
const SearchModel = require("../model/search/SearchModel");
const PaginationModel = require("../model/search/PaginationModel");
const ResponseMessages = require("../dictionary/ResponseMessages");

class SearchController {
    static async get(request) {
        const query = request.params.query;
        let page = request.params["page"] || 1;
        const url =
            page < 2
                ? `?s=${query}&post_type=wp-manga`
                : `/page/${page}/?s=${query}&post_type=wp-manga`;

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
                dataModel.searches = [];
                dataModel.pagination = [];

                $(".c-tabs-item__content").each((i, el) => {
                    let searchModel = new SearchModel();
                    searchModel.title = $(el).find(".h4 > a").text();
                    searchModel.thumbnail = $(el).find("img").attr("data-src");
                    searchModel.genres = $(el)
                        .find(".mg_genres > .summary-content > a")
                        .map((i, el) => $(el).text())
                        .get();
                    searchModel.status = $(el).find(".mg_status > .summary-content").text().replace("\n", "").slice(0, -1);
                    searchModel.release = $(el).find(".mg_release > .summary-content").text().replace("\n", "").slice(0, -1);
                    searchModel.rating = $(el).find(".post-total-rating > span").text();
                    searchModel.endpoint = $(el)
                        .find(".h4 > a")
                        .attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);

                    dataModel.searches.push(searchModel.toJSON());
                });
                responseModel.data = dataModel.toJSON();
                responseModel.message = ResponseMessages.PARTIAL;

                $(".wp-pagenavi .page, .wp-pagenavi .current, .previouspostslink, .nextpostslink").each((i, el) => {
                    let paginationModel = new PaginationModel();
                    paginationModel.name = $(el).text();

                    let link = $(el).attr("href");
                    if (link) {
                        paginationModel.endpoint = link
                            .replace(ExternalUrl.URL, "/")
                            .slice(0, link.includes("page") ? 7 : 0);
                    } 
                    else {
                        paginationModel.endpoint = `/page/${page}`;
                    }

                    dataModel.pagination.push(paginationModel.toJSON());
                });
                responseModel.data = dataModel.toJSON();
                responseModel.message = ResponseMessages.FULL;
            });
        }
        catch (error) {
            if (responseModel.status === undefined){
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

module.exports = SearchController;