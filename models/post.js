const { Model, DatTypes } = require('sequelize');
const bycrpt = require('bcrypt');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DatTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_name: {
            type: DatTypes.STRING,
            allowNull: false
        },
        content: {
            type: DatTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DatTypes.INTEGER,
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