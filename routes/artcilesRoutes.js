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
router.post('/:articleId/like',LikeArticleHandler)
router.route('/:articleId').get(getArticleById).delete(deleteArticle)
router.get('/article/:userId',getUserArticleById )
router.post('/:articleId/comments',createArticleComment)



export default router
