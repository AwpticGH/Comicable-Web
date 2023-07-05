const Routes = require("../dictionary/web/Routes");

const express = require("express");
const router = express.Router();

router.get(Routes.CUSTOMER_SUPPORT, (request, response) => {
    response.render("information/customer_support", {
        layout: "layout/main",
        css_file: "dukunganPelanggan",
        page_title: "Customer Support"
    });
});

router.get(Routes.ABOUT, (request, response) => {
    response.render("information/about_us", {
        layout: "layout/main",
        css_file: "tentangKami",
        page_title: "About Us"
    });
});

router.get(Routes.TERMS_OF_SERVICE, (request, response) => {
    response.render("information/terms_of_service", {
        layout: "layout/main",
        css_file: "ketentuanLayanan"
    });
});

module.exports = router;