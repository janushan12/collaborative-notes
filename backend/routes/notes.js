const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.userId
    });
    await note.save();
    res.json(note);
});

router.get('/', auth, async (req, res) => {
    const notes = await Note.find({$or: [{owner: req.userId}, {collaborators: req.userId}]});
    res.json(notes);
});

router.post('/:id/collaborators', auth, async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({message: 'Note not found'});
    if (note.owner.toString() !== req.userId) return res.status(403).json({message: 'Not authorized'});

    note.collaborators.push(req.body.userId);
    await note.save();
    res.json(note);
});

router.get('/search', auth, async (req, res) => {
    const { query } = req.query;
    const notes = await Note.find({
        $text: { $search: query },
        $or: [{ owner: req.userId }, { collaborators: req.userId }]
    });
    res.json(notes);
});

module.exports = router;