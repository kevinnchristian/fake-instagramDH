const { Publication, User, Comment } = require('../models');
const moment = require('moment');
// Biblioteca de formatação de data, fazer require e exportr para view que vai ser usada

const postController = {
  index: async (_req, res) => {
    let publications = await Publication.findAll({
      include: [{
        model: User,
        required: true
      },
      {
        model: Comment,
        required: false,
        include: {
          model: User
        }
      }]
    });

    res.render('index', { publications, moment })

  },

  create: (_req, res) => res.render('post'),

  store: (req, res) => {
    const [post] = req.files;
    const { user } = req.session;

    const publication = Publication.create({
      image: post.filename,
      like: 0,
      users_id: user.id,
      create_at: new Date(),
      update_at: new Date()
    });

    return res.redirect('/home');

  }

};

module.exports = postController;