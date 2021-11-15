import express from 'express'
import {createTeam,
    getTeamInfo,
    updateTeamInfo,
    deleteTeam,
    AddUserToTeam,
    deleteUserToTeam,getTeams
} from '../controller/TeamController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(protect,createTeam)
router.get('/all',protect,getTeams)
router.route('/:teamId').get(protect,getTeamInfo).delete(protect,deleteTeam)
router.route('/add').post(protect,AddUserToTeam)
router.route('/delete').post(protect,deleteUserToTeam)


export default router