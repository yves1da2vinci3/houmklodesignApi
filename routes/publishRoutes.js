import express from 'express'
const router = express.Router()
import {
    registerPublish,
    getPublishById ,
    deletePublish,
    getPublishs,
    getUserPublishById ,
} from '../controller/publishController.js'


router.post('/', registerPublish)
router.get('/',getPublishs)
router.route('/:publishId').get(getPublishById).delete(deletePublish)
router.get('/publish/:userId', getUserPublishById )



export default router
