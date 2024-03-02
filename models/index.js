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

// * Association #2
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});
// * Association #2
module.exports = { User, Post, Comment };
