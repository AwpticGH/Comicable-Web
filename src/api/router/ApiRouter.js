const BaseController = require("../controller/BaseController");
const HomeController = require("../controller/HomeController");
const ProjectController = require("../controller/ProjectController");
const SearchController = require("../controller/SearchController");
const SeriesController = require("../controller/SeriesController");
const ChapterController = require("../controller/ChapterController");
const Routes = require("../dictionary/Routes");

const express = require("express");
const router = express.Router();

router.get(Routes.BASE, BaseController.get);
router.get(Routes.HOME, async (request, response) => {
    let model = await HomeController.get();
    return response.json(model);
});
router.get(Routes.PROJECT, async (request, response) => {
    let model = await ProjectController.get(request);
    return response.json(model);
});
router.get(Routes.SEARCH, async (request, response) => {
    let model = await SearchController.get(request);
    return response.json(model);
});
router.get(Routes.SEARCH_WITH_PAGE, async (request, response) => {
    let model = await SearchController.get(request);
    return response.json(model);
});
router.get(Routes.SERIES, async (request, response) => {
    let model = await SeriesController.get(request);
    return response.json(model);
});
router.get(Routes.CHAPTER, async (request, response) => {
    let model = await ChapterController.get(request);
    return response.json(model);
});

module.exports = router;