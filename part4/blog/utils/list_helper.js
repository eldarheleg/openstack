const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs.length) return null;
  return blogs.reduce(
  (max, blog) => blog.likes > max.likes ? blog : max
);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
