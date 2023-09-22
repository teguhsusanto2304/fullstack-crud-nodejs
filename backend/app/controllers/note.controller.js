const { validationResult } = require('express-validator');
const db = require("../models");
const Note = db.note;
exports.create = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return Note.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.userId
        })
            .then((Note) => {
                res.status(200).json({
                    status: "success",
                    Note,
                });
            })
            .catch((err) => {
                console.log(">> Error while creating note: ", err);
                JSON.stringify(err, null, 4)
            });
    } else {
        res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
};
exports.findAll = async (req, res) => {
    const notes = await Note.findAll({
        include: ['user'],
        where: { userId: req.userId }
    });
    res.status(200).json({
        status: 'success',
        results: notes.length,
        data: notes.map((note) => {
            return {
                id: note.id,
                title: note.title,
                content: note.content,
                user: {
                    id: note.userId,
                    name: note.user.username
                }
            };
        }),
    });
};
exports.findOne = async (req, res) => {
    const id = req.params.id;
    const note = await Note.findByPk(id, { include: ['user'] })
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: 'success',
                    data: {
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        user: {
                            id: data.userId,
                            name: data.user.username
                        }

                    }
                })
            } else {
                res.status(404).send({
                    message: `Cannot find Note with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Note with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Note.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Note was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Noted with id=${id}. Maybe Note was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Note with id=" + id
                });
            });
    } else {
        res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Note.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Note was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot deleted Noted with id=${id}. Maybe Note was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleted Note with id=" + id
            });
        });
};