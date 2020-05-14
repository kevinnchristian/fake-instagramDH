module.exports = (sequelize, DataType) => {
  // DataType converte os dados que vem basicamente como string para o formato de
  // dados que precisamos
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataType.STRING,
        allowNull: false
      },
      create_at: DataType.DATE,
      update_at: DataType.DATE,
      publications_id: {
        type: DataType.INTEGER,
        allowNull: false
      },
      users_id: {
        type: DataType.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'users_id',
    });
    Comment.belongsTo(models.Publication, {
      foreignKey: 'publications_id',
    });
  };

  return Comment;

};