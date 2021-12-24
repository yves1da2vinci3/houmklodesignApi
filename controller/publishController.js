import asyncHandler from 'express-async-handler'
import Publish from '../models/PublishModel.js'



// tthee endpoints 

// @desc    Register a new Publish
// @route   POST /api/publish
// @access  Public



const registerPublish = asyncHandler(async (req, res) => {
    const { username,
      Title,
      Description,
      imageUrl,
      userImgUrl,
      category,
      userId} = req.body
    const publish = await Publish.create({
      username,
      Title,
      Description,
      imageUrl,
      userImgUrl,
      category,
      userId,
    })
  
    if (!publish) {
     
      res.status(400)
      throw new Error('Les données sont invalides')
    
  }

  }
  )


  // GET ALL PUBLISH

  const getPublishs = asyncHandler(async (req, res) => {
    let Publishs;
    const category = req.query.category
    if(category){
      Publishs = await Publish.find().where({category })
    }else{
      const keyword = req.query.keyword
      ? {
        Title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
      Publishs = await Publish.find({ ...keyword })
    }
    res.json(Publishs)
  })


  // delete a publish
  const deletePublish = asyncHandler(async (req, res) => {
    let  ItemToRemoved = await Publish.findById(req.params.publishId)
  
    if (ItemToRemoved) {
      await ItemToRemoved.remove()
      res.json({ message: 'Publish supprimé ' })
    } else {
      res.status(404)
      throw new Error("Publish non trouvé")
    }
  })


  // get one publish


  const getPublishById = asyncHandler(async (req, res) => {
    const publish = await Publish.findById(req.params.publishId)
    if (publish) {
      res.json(publish)
    } else {
      res.status(404)
      throw new Error("L'utilisateur non trouvé")
    }
  })
  // get publish by category

  // get user 's publish 

  const getUserPublishById = asyncHandler(async (req, res) => {
    const Publishs = await Publish.find().where({userId : req.params.userId})
  
    if (Publishs) {
      res.json(Publishs)
    } else {
      res.status(404)
      throw new Error("L'utilisateur non trouvé")
    }
  })


  export { 
    registerPublish,
    getPublishById ,
    deletePublish,
    getPublishs,
    getUserPublishById ,
  }