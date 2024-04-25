const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// the following sets up the server connection, initializes middleware, sessions, and cookies, and starts the server.
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT =  process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// intitializes the session and adds the maxAge cookie that will end the session after half an hour. this will log the user out if no input is made fo half an hour
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 30 * 60 *  1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  app.use(express.json());
  app.use(express.urlencoded({ extended:true }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(routes);

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });