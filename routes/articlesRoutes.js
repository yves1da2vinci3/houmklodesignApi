import express from 'express'
const router = express.Router()
import {
  registerArticle,
  getArticles,
  getArticleById,
  getUserArticleById,
  deleteArticle,
  createArticleComment,
getLatestArticle,
LikeArticleHandler
} from '../controller/articlesController.js'

router.get('/latest',getLatestArticle)
router.post('/article', registerArticle)
router.get('/',getArticles)
router.route('/:articleId').get(getArticleById).delete(deleteArticle)
router.get('/article/:userId',getUserArticleById )
router.post('/:articleId/comments',createArticleComment)
router.put('/:articleId/like',LikeArticleHandler)


export default router
