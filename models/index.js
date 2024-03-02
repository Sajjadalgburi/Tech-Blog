const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comments');

// ! Association #1
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
});
// ! Association #1

module.exports = { User, Post, Comment };
