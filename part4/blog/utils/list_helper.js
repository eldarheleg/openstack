const _ = require("loadsh"); 

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs.length) return null;
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;

  const counts = _.countBy(blogs, "author");

  const topAuthor = _.maxBy(
    Object.keys(counts),
    author => counts[author]
  );

  return {
    author: topAuthor,
    blogs: counts[topAuthor]
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;

  const likesByAuthor = _.groupBy(blogs, "author");
  const totalLikesByAuthor = _.mapValues(likesByAuthor, authorBlogs =>
    authorBlogs.reduce((sum, blog) => sum + blog.likes, 0)
  );
  const topAuthor = _.maxBy(
    Object.keys(totalLikesByAuthor),
    author => totalLikesByAuthor[author]
  );
  return {
    author: topAuthor,
    likes: totalLikesByAuthor[topAuthor]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
