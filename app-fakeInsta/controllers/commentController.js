const { Comment } = require('../models');

const commentController = {
  store: async (req, res) => {
    // Podemos tbm trazer pela rota const { idPost } = req.params;
    const { idPost, description } = req.body;
    const { user } = req.session;

    const newComment = await Comment.create({
      description,
      users_id: user.id,
      publications_id: idPost,
      create_at: new Date,
      update_at: new Date
    });

    if(!newComment){
      console.log("Erro ao postar o comentário");
    }

    return res.redirect('/home');
  }

};

module.exports = commentController;