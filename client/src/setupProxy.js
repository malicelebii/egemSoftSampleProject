const proxy = require("http-proxy-middleware");

module.exports = function(app) {

    app.use(proxy("/api", { target: "https://egemsoftsample.herokuapp.com/" }));
    app.use(proxy("/deneme", { target: "https://bynogame.com/" }))

};
