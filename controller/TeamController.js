import AsyncHandler from "express-async-handler";
import Team from '../models/TeamModel.js';
import User from '../models/userModel.js';



// @desc    create a  team 
// @route  get /api/team/
// @access  Public

const createTeam = AsyncHandler( async (req,res) => {
    const {TeamName,TeamUrl,AdminId} = req.body
    // const AdminId = req.user._id
    try{
        const team = await Team.create({
            TeamName,
            TeamUrl,
            AdminId
        })
        if(team){
            res.json(team)
        }
     

    }catch(err) {
        console.log(err)
        res.status(401)
        throw Error( " donnees entrees invalides")
    }
    
   
    
} )

// @desc    get all teams where an user belong to. 
// @route  get /api/team/all
// @access  Public

const getTeams = AsyncHandler( async (req,res) => {
  const teams = await Team.find({TeamMembers : {$in : req.user._id}})

  if(teams) {
      res.json(teams)
  }else{
      throw('aucune equipe trouve')
  }
} )
// @desc    get team 
// @route  get /api/team/
// @access  Public

const getTeamInfo = AsyncHandler( async (req,res) => {
  const team = await Team.findById(req.params.teamId)
  if(team){
      res.json(team)
  }else{
      res.status(402)
      throw new Error('aucune equipe trouve')
  }
} )

// @desc    update team 
// @route   POST /api/team/
// @access  Public

const updateTeamInfo = AsyncHandler( async (req,res) => {
    const {TeamId,TeamUrl,TeamName} = req.body;
    const team = await Team.findById(TeamId)
    if(team){
        team.TeamName = TeamName || team.TeamName
        team.TeamUrl = req.body.TeamUrl || team.TeamUrl
    }
    const updatedTeam = await team.save()
    res.json({
        _id: updatedTeam._id,
        TeamName: updatedTeam.TeamName,
        TeamUrl: updatedTeam.TeamUrl,
      })
} )

// @desc    delete team 
// @route   delete /api/team/
// @access  Public

const deleteTeam = AsyncHandler( async (req,res) => {
    const team =  await Team.findById(req.params.teamId)
    if(team){
        await team.remove()
        res.json("message team delte")
    }
} )
// @desc    add an user to the team 
// @route   POST /api/team/add
// @access  Public


const AddUserToTeam = AsyncHandler( async (req,res) => {
 const {Pseudo,TeamId} = req.body;
 const team = await Team.findById(TeamId)
 const user = await User.findOne().where('Pseudo').equals(Pseudo)
 if (!user){
      res.status(402).json('aucun uitlisateur ne correspond a ce pseudo')
 }
 else {
     const UserId = user._id;
      const userExists = team.TeamMembers.includes(UserId)
      if(userExists) {
        return res.json(" l'utilsateur existe deja ") 
      }else{
      team.TeamMembers.push(UserId)
      await team.save()
      res.json('uitlisateur ajoute avec success')
     
 }
}})

// @desc    add an user to the team 
// @route   POST /api/team/delete
// @access  Public
const deleteUserToTeam = AsyncHandler( async (req,res) => {
    const {Pseudo,TeamId} = req.body
    const team = await Team.findById(TeamId)
    const user = await User.findOne().where('Pseudo').equals(Pseudo)
    const  userId = user._id;

    const NewTeamMembers = team.TeamMembers.filter( memberId => memberId !== userId  )
    team.TeamMembers.push(...NewTeamMembers)
    await team.save()
    res.json('delete user from team with success')
})




export  {
    createTeam,
    getTeamInfo,
    updateTeamInfo,
    deleteTeam,
    AddUserToTeam,
    deleteUserToTeam,
    getTeams
}