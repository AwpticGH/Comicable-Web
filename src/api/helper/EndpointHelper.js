class EndpointHelper {
    static parseChapterEndpointAsInteger(endpoint) {
        return parseInt(endpoint.substring(endpoint.lastIndexOf("-") + 1));
    }

    static parseChapterEndpointAsSeriesEndpoint(endpoint) {
        return endpoint.substring(0, endpoint.lastIndexOf("/"));
    }

    static parseSeriesEndpointAsSeries(endpoint) {
        return endpoint.substring(endpoint.lastIndexOf("/") + 1);
    }

    static parseChapterEndpointAsChapter(endpoint) {
        return endpoint.substring(endpoint.lastIndexOf("/") + 1);
    }
}

module.exports = EndpointHelper;