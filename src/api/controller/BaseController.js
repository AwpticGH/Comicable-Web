class BaseController {
    static get(request, response) {
        response.json({
            status: 200,
            message: "This API Works! Please Report If There Are Any Problems!!!"
        });
    }
}

module.exports = BaseController;