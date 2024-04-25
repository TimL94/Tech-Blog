const { Model, DataTypes } = require('sequelize');
const bycrpt = require('bcrypt');
const sequelize = require('../config/connection');


//uses bycrpt on the password
class User extends Model {
    checkPassword(loginPw) {
        return bycrpt.compareSync(loginPw, this.password);
    }
}


//creates the user model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7],
            }
        }
    },
    {
        //uses bycrypt to encrypt user passwords
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bycrpt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;