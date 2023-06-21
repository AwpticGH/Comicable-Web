const BASE_PATH = require("../../../BasePath");
const Routes = require(`${BASE_PATH}/src/client/dictionary/web/Routes`);
const CollectionModel = require(`${BASE_PATH}/src/client/model/CollectionModel`);
const References = require(`${BASE_PATH}/src/client/dictionary/database/References`);
const { getDatabase, set, get, ref } = require("firebase/database");
const SessionUtility = require(`${BASE_PATH}/src/client/utility/web/SessionUtility`);
const SessionVariables = require(`${BASE_PATH}/src/client/dictionary/web/SessionVariables`);

class CollectionController {

    create(response, model) {
        let saved = false;
        if (model instanceof CollectionModel) {
            let database = getDatabase();
            set((database, References.COLLECTION), {
                comic: model.getComic,
                user: model.getUser
            });
            saved = true;
        }
        if (saved) {
            response.redirect(Routes.COLLECTION_BOUGHT_DUMMY);
        }
    }

    read(request, response, model) {
        let found = false;
        console.log("READING");
        if (model instanceof CollectionModel) {
            let database = getDatabase();
            let reference = ref(database, References.COLLECTION);
            console.log("GETTING REFERENCE");
            get(reference).then((snapshot) => {
                snapshot.forEach((dataSnapshot) => {
                    let data = dataSnapshot.val().user;
                    if (data === model.getUser) {
                        request.session[SessionVariables.COLLECTION] = {};
                        request.session[SessionVariables.COLLECTION][dataSnapshot.key] = dataSnapshot.val();
                        found = true;
                        console.log("FOUND");
                        console.log(JSON.stringify(request.session[SessionVariables.COLLECTION]));
                    }
                });

                console.log("rendering");
                response.render("collection/comic_collection", {
                    layout: "layout/main",
                    css_file: "semua",
                    page_title: "My Collection"
                });
            });
        };
    }
}

module.exports = CollectionController;