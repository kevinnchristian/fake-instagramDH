const { User } = require('../../models');
const bcrypt = require('bcrypt');

const userApiController = {
  index: async (_req, res) => {
    try {
      const users = await User.findAll() 
      return res.status(200).json(users);
    } catch (error) {
      console.log(error)
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          msg: "Sem conexão com banco de dados, tente novamente!"
        })
      }
        return res.status(400).json({
          error: true,
          msg: "Erro na requisição tente novamente!"
        });
    } 
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        if (error.name === "SequelizeConnectionRefusedError") {
          return res.status(500).json({
            error: true,
            msg: "Sem conexão com banco de dados, tente novamente!"
          })
        }
          return res.status(400).json({
            error: true,
            msg: "Erro na requisição tente novamente!"
          });
      } 

  },
  
  store: async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
      const newUser = await User.create({
        name,
        username,
        email,
        password: hashPassword,
        create_at: new Date(),
        update_at: new Date()
      });

      return res.status(201).json(newUser);

    } catch (error) {
        console.log(error)
        if (error.name === "SequelizeConnectionRefusedError") {
            return res.status(500).json({
              error: true,
              msg: "Sem conexão com banco de dados, tente novamente!"
            })
          }
          if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json(error.parent.sqlMessage);
          }
          return res.status(400).json({
            error: true,
            msg: "Erro na requisição tente novamente!"
        });
      } 
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {
      const user = await User.update({
        name,
        username,
        email,
        password: hashPassword
      }, {
        where: { 
          id 
        },
      });
      const updateUser = await User.findByPk(id)
      return res.status(201).json(updateUser);

    } catch (error) {
        console.log(error)
        if (error.name === "SequelizeConnectionRefusedError") {
          return res.status(500).json({
            error: true,
            msg: "Sem conexão com banco de dados, tente novamente!"
          })
        };
        if (error.name === "SequelizeUniqueConstraintError") {
          return res.status(400).json(error.parent.sqlMessage);
        };
          return res.status(400).json({
            error: true,
            msg: "Erro na requisição tente novamente!"
        });
      } 
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.destroy({
          where: {
            id
          }
        });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeForeignKeyConstraintError") {
          return res.status(400).json({
            error: true,
            msg: "Esse usuario contem posts, não pode ser excluido",
          });
        };
        return res.status(400).json({
          error: true,
          msg: "Erro na requisição tente novamente!"
        });
      } 

  }

};

module.exports = userApiController;