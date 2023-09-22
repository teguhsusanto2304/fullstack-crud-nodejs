const { authJwt } = require("../middleware");
const controller = require("../controllers/note.controller");
const { body, validationResult } = require('express-validator');
const db = require("../models");
const Note = db.note;
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/notes", [authJwt.verifyToken], controller.findAll);
  app.get('/api/notes/:id', [authJwt.verifyToken], controller.findOne);
  app.post("/api/notes", [authJwt.verifyToken],
    [body('title').isLength({
      min: 10
    }),
    body('content').isLength({
      min: 10
    })], controller.create);
  app.put("/api/notes/:id", [authJwt.verifyToken],
    [body('title').isLength({
      min: 10
    }),
    body('content').isLength({
      min: 10
    })], controller.update);
  app.delete("/api/notes/:id", [authJwt.verifyToken], controller.delete);
};