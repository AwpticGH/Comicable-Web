const Routes = require("../dictionary/web/Routes");
const WebVariables = require("../dictionary/web/WebVariables");

const HomeController = require("../../api/controller/HomeController");
const ProjectController = require("../../api/controller/ProjectController");
const SearchController = require("../../api/controller/SearchController");
const SeriesController = require("../../api/controller/SeriesController");
const ChapterController = require("../../api/controller/ChapterController");

const express = require("express");
const router = express.Router();

router.get(Routes.HOME, async (request, response) => {
    let responseModel = await HomeController.get();
    return response.render("index", {
        layout: "layout/main",
        css_file: "home",
        page_title: "Home",
        api_data: responseModel.data
    });
});

router.get(Routes.PROJECT, async (request, response) => {
    let responseModel = await ProjectController.get(request);
    return response.render("project/index", {
        layout: "layout/main",
        css_file: "semua",
        page_title: "Projects",
        api_data: responseModel.data
    });
});

router.get(Routes.PROJECT_WITH_PAGE, async (request, response) => {
    let responseModel = await ProjectController.get(request);
    return response.render("project/index", {
        layout: "layout/main",
        css_file: "semua",
        page_title: "Projects",
        api_data: responseModel.data
    });
});

router.get(Routes.SEARCH, async (request, response) => {
    request.params.query = request.query[WebVariables.SEARCH_QUERY];
    request.params.page = request.query[WebVariables.SEARCH_PAGE];
    let responseModel = await SearchController.get(request);
    return response.render("search/index", {
        layout: "layout/main",
        css_file: "terbaru",
        page_title: "Search",
        api_data: responseModel.data,
        search_query: request.query[WebVariables.SEARCH_QUERY]
    })
});

router.get(Routes.SERIES, async (request, response) => {
    let responseModel = await SeriesController.get(request);
    response.render("series/index", {
        layout: "layout/main",
        css_file: "detail",
        page_title: "Series",
        api_data: responseModel.data
    });
});

router.get(Routes.CHAPTER, async (request, response) => {
    let responseModel = await ChapterController.get(request);
    response.render("chapter/index", {
        layout: "layout/main",
        css_file: "view",
        page_title: "Chapter",
        api_data: responseModel.data
    })
});

router.get(Routes.COLLECTION, (request, response) => {

});

module.exports = router;