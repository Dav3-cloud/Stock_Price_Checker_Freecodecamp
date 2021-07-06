const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite("Functional Tests", function () {
    suite("5 functional get request tests", function () {
      test("Viewing one stock: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "AAPL" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "AAPL");
            assert.exists(res.body.stockData.price, "AAPL has a price");
            done();
          });
      });
      test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "NKE", like: true })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "NKE");
            assert.equal(res.body.stockData.likes, 1);
            assert.exists(res.body.stockData.price, "NKE has a price");
            done();
          });
      });
      test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: "NKE", like: true })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData.stock, "NKE");
            assert.equal(res.body.stockData.likes, 1);
            assert.exists(res.body.stockData.price, "NKE has a price");
            done();
          });
      });
      test("Viewing two stocks: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: ["SBUX", "BA"] })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData[0].stock, "SBUX");
            assert.equal(res.body.stockData[1].stock, "BA");
            assert.exists(res.body.stockData[0].price, "SBUX has a price");
            assert.exists(res.body.stockData[1].price, "BA has a price");
            done();
          });
      });
      test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done) {
        chai
          .request(server)
          .get("/api/stock-prices/")
          .set("content-type", "application/json")
          .query({ stock: ["SBUX", "BA"], like: true })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.stockData[0].stock, "SBUX");
            assert.equal(res.body.stockData[1].stock, "BA");
            assert.exists(res.body.stockData[0].price, "SBUX has a price");
            assert.exists(res.body.stockData[1].price, "BA has a price");
            assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
            assert.exists(res.body.stockData[1].rel_likes, "has rel_likes");
            done();
          });
      });
    });
  });