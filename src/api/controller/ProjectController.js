const axios = require("axios");
const cheerio = require("cheerio");
const ExternalUrl = require("../dictionary/ExternalUrl");
const ResponseModel = require("../model/ResponseModel");
const DataModel = require("../model/project/DataModel");
const ProjectModel = require("../model/project/ProjectModel");
const ChapterModel = require("../model/project/ChapterModel");
const PaginationModel = require("../model/project/PaginationModel");

class ProjectController {
    static async get(request) {
        const page = request.params["page"];
        const url = page < 2 ? "/project" : `/project/page/${page}`;
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

                const dataModel = new DataModel();
                dataModel.projects = [];
                dataModel.pagination = [];

                $(".page-listing-item .page-item-detail").each((i, el) => {
                    let projectModel = new ProjectModel();
                    let chapterModel = new ChapterModel();

                    projectModel.title = $(el).find(".h5 > a ").text();
                    projectModel.type = $(el).find("a > span").text();
                    projectModel.thumbnail = $(el).find("a > img").attr("data-src");
                    projectModel.series = $(el)
                        .find("a")
                        .attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);
                    chapterModel.name = $(el)
                        .find(".chapter-item > .chapter > a")
                        .first()
                        .text()
                        .trim();
                    chapterModel.endpoint = $(el).find(".chapter-item > .chapter > a").attr("href")
                        .replace(ExternalUrl.URL, "/")
                        .slice(0, -1);
                    projectModel.chapter = chapterModel.toJSON();

                    dataModel.projects.push(projectModel.toJSON());
                });
                responseModel.message = "Successfully Fetched Projects Data";

                $(".wp-pagenavi .page, .wp-pagenavi .current, .previouspostslink, .nextpostslink").each((i, el) => {
                    let paginationModel = new PaginationModel();
                    paginationModel.name = $(el).text();
                    let link = $(el).attr("href");

                    if (link) {
                        paginationModel.endpoint = link.replace(ExternalUrl.URL, "/").slice(0, -1);
                    }

                    dataModel.pagination.push(paginationModel.toJSON());
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

module.exports = ProjectController;