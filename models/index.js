const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comments');

// ! Association #1
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});
// ! Association #1

// * Association #2
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});
// * Association #2
module.exports = { User, Post, Comment };
