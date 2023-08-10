const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
const sess = {
  secret: 'your-secret-key',
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: true,
};
app.use(session(sess));

// Handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import and use routes
const routes = require('./controllers'); 
app.use(routes);

// Database synchronization
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
