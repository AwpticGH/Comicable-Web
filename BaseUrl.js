class BaseUrl {
    static URL(request) {
        return `${request.protocol}://${request.get("host")}`;
    }
}

module.exports = BaseUrl;