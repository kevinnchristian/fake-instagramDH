module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define(
    "Publication",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      like: DataTypes.INTEGER,
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false
    }
  );

  // Associar os modelos 
  Publication.associate = (models) => {
    Publication.belongsTo(models.User, {
      foreignKey: 'users_id',
    });
    Publication.hasMany(models.Comment, {
      foreignKey: 'publications_id',
    });
  };

  return Publication;

};