const db = require('../db');
const validator = require('../validator/UserDatabaseValidator');


class PostController {
  // создать новый пост
  static async createPost(req, res) {
    try {
      const { userId, content } = req.body;
      const newPost = await db.query(
        `INSERT INTO post (content, userId) 
        values ($1, $2) RETURNING *`,
        [content, userId]);
      return res.json(newPost.rows[0]);
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка при добавлении поста!' });
    }
  };
  // удалить пост
  static async deletePost(req, res) {
    try {
      const { id } = req.body;
      const isValidId = await validator.idExistsDatabase(id, 'post');
      if (!isValidId) {
        return res.status(404).json({ message: 'Такого поста не существует!' })
      }
      await db.query(
        `DELETE FROM post 
        WHERE id = $1`, [id]);
      return res.status(200).json({ message: 'Пост успешно удален!' });
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка при удалении поста!' });
    }
  };
  // получить все посты
  static async getAllPost(req, res) {
    try {
      const { userId } = req.body;
      const posts = await db.query(`
        SELECT post.id, post.content, post.date, person.name, person.surname, person.image
        FROM post
        JOIN person ON post.userid = person.id
        WHERE post.userId = $1`, [userId]);
      if (posts.rows.length === 0) {
        return res.status(404).json({ message: 'постов нет!' });
      }

      return res.status(200).json(posts.rows);

    } catch (error) {
      return res.status(400).json({ message: 'Ошибка при получении постов!' });
    }
  }
}

module.exports = PostController;