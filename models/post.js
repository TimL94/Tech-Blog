const { Model, DataTypes } = require('sequelize');
const bycrpt = require('bcrypt');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [3, 150]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'

            }
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;