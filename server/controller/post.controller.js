const db = require('../db');
const validator = require('../validator/validator');


class PostController {
  async createPost(req, res) {
    try {
      const { userId, content } = req.body;
      const newPost = await db.query('INSERT INTO post (content, userId) values ($1, $2) RETURNING *', [content, userId])
      console.log(newPost.rows[0]);
      return res.json(newPost.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Ошибка при добавлении поста!' });
    }
  };
  async deletePost(req, res) {
    try {
      const { id } = req.body;
      const isValidId = await validator.ValidId(id, 'post');
      if (!isValidId) {
        return res.status(404).json({ message: 'Такого поста не существует!' })
      }
      await db.query('DELETE FROM post WHERE id = $1', [id]);
      return res.status(200).json({message: 'Пост успешно удален!'});
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Ошибка при удалении поста!' });
    }
  };
  async getAllPost(req, res) {
    try {
      const { userId } = req.body;
      const posts = await db.query('SELECT * FROM post WHERE userId = $1', [userId]);
      console.log(posts.rows)
      if (posts.rows.length != 0) {
        return res.status(200).json(posts.rows);
      } else {
        return res.status(404).json({ message: 'постов нет!' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Ошибка при получении постов!' });
    }
  }
}

module.exports = new PostController();