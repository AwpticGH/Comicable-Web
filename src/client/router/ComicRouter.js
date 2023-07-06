const Routes = require("../dictionary/web/Routes");

const EndpointHelper = require("../../api/helper/EndpointHelper");

const AuthenticationFlag = require("../flag/AuthenticationFlag");

const AuthenticationConfig = require("../config/firebase/AuthenticationConfig");

const WebVariables = require("../dictionary/web/WebVariables");
const SessionVariables = require("../dictionary/web/SessionVariables");

const HomeController = require("../../api/controller/HomeController");
const ProjectController = require("../../api/controller/ProjectController");
const SearchController = require("../../api/controller/SearchController");
const SeriesController = require("../../api/controller/SeriesController");
const ChapterController = require("../../api/controller/ChapterController");

const CollectionController = require("../controller/collections/CollectionController");
const CheckpointController = require("../controller/checkpoints/CheckpointController");

const CollectionModel = require("../model/CollectionModel");
const CheckpointModel = require("../model/CheckpointModel");

const collectionController = new CollectionController();
const checkpointController = new CheckpointController();

const express = require("express");
const router = express.Router();

// Get
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
    let collectionModel;
    let checkpointModel;
    if (AuthenticationFlag.isAuthenticated()) {
        collectionModel = await collectionController.readByTitle(responseModel.data.detail.title);
    }
    if (collectionModel !== undefined) {
        checkpointModel = await checkpointController.read(collectionModel.uid);
    }

    response.render("series/index", {
        layout: "layout/main",
        css_file: "detail",
        page_title: "Series",
        collectionController: collectionController,
        checkpointController: checkpointController,
        api_data: responseModel.data,
        collection: collectionModel,
        checkpoint: checkpointModel
    });
});

router.get(Routes.CHAPTER, async (request, response) => {
    let collectionModel, checkpointModel;
    if (AuthenticationFlag.isAuthenticated()) {
        collectionModel = await collectionController.readByEndpoint(EndpointHelper.parseChapterEndpointAsSeriesEndpoint(request.originalUrl));
        if (collectionModel !== undefined) {
            checkpointModel = await checkpointController.read(collectionModel.uid);
            if (checkpointModel !== undefined) {
                if (EndpointHelper.parseChapterEndpointAsInteger(request.originalUrl) > EndpointHelper.parseChapterEndpointAsInteger(checkpointModel.endpoint)) {
                    checkpointModel.endpoint = request.originalUrl;
                    let result = await checkpointController.update(checkpointModel);
                    if (!result) {
                        request.session[SessionVariables.ALERT] = "Failed To Update Checkpoint!";
                    }
                }
            } else {
                checkpointModel = new CheckpointModel();
                checkpointModel.endpoint = request.originalUrl;
                checkpointModel.collection = collectionModel.uid;

                let result = await checkpointController.create(checkpointModel);
                if (!result) {
                    request.session[SessionVariables.ALERT] = "Failed To Create Checkpoint!";
                }
            }
        }
    }

    let responseModel = await ChapterController.get(request);
    response.render("chapter/index", {
        layout: "layout/main",
        css_file: "view",
        page_title: "Chapter",
        api_data: responseModel.data
    })
});

router.get(Routes.COLLECTION, async (request, response) => {
    let collections = await collectionController.read();
    let checkpoints = await checkpointController.readAll(collections);
    let responses;
    if (collections !== undefined) {
        responses = [];
        for (let collection of collections) {
            let responseModel = await SeriesController.get(EndpointHelper.parseSeriesEndpointAsSeries(collection.endpoint));
            responses.push(responseModel.data.detail);
        }
    }

    console.log("collections");
    console.log(responses);
    console.log("checkpoints");
    console.log(checkpoints);

    response.render("collection/index", {
        layout: "layout/main",
        css_file: "semua",
        page_title: "Koleksi",
        collections: collections,
        responses: responses,
        checkpoints: checkpoints,
        EndpointHelper: EndpointHelper
    });
});

// posts
router.post(Routes.COLLECTION_CREATE, async (request, response) => {
    if (AuthenticationFlag.isAuthenticated()) {
        let model = new CollectionModel();
        model.user = AuthenticationConfig.getCurrentUser().uid;
        model.title = request.body[WebVariables.COLLECTION_TITLE];
        model.endpoint = request.body[WebVariables.COLLECTION_ENDPOINT];

        let hasCollection = await collectionController.readByTitle(model.title) !== undefined;
        if (!hasCollection) {
            let result = await collectionController.create(model);
            if (!result) {
                request.session[SessionVariables.ALERT] = "Failed To Add Comic To Collection";
            }
        }
    } else {
        request.session[SessionVariables.ALERT] = "Please Login To Add Comic To Your Collection";
    }

    response.redirect(request.body[WebVariables.COLLECTION_ENDPOINT]);
});

router.post(Routes.COLLECTION_DELETE, async (request, response) => {
    if (AuthenticationFlag.isAuthenticated()) {
        let collectionIsDeleted = await collectionController.delete(request.body[WebVariables.COLLECTION_UID]);
        if (collectionIsDeleted) {
            let checkpoint = await checkpointController.read(request.body[WebVariables.COLLECTION_UID]);
            if (checkpoint !== undefined) {
                let checkpointIsDeleted = await checkpointController.delete(checkpoint.uid);
                if (!checkpointIsDeleted) {
                    request.session[SessionVariables.ALERT] = "Failed To Remove Checkpoint";
                }
            }
        }
        else {
            request.session[SessionVariables.ALERT] = "Failed To Remove From Collection";
        }
    }

    response.redirect(request.body[WebVariables.COLLECTION_ENDPOINT]);
});



module.exports = router;