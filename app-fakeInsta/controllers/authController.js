const authController = {
  create: (_req, res) => {
    return res.render('auth/login');
  },

  store: (_req, res) => {

  }

};

module.exports = authController;