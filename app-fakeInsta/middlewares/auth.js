module.exports = (req, res, next) => {
  if (!req.session.user) res.redirect('/login');

  // Vai devolver para views, o usuário que fex login!!!
  res.locals.user = req.session.user;
  next();
};