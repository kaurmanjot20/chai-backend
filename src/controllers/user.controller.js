import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';
/* const registerUser =  asyncHandler(async (req,res) =>{
    res.status(200).json({
        message: "ok❤"
    })
}) */
// User is directly talking to db..bcz made from mongodb

// get user details from frontend
// validation - not empty
// check if user already exists: username, email
// check for images, check for avatar
// upload them to cloudinary, recheck for avatar
// create user object (mongoDB a no-sql db) - create entry in db
// remove password and refresh token field from response
// check for user creation 
// return res if user created else error

const registerUser =  asyncHandler(async (req,res) =>{
   // get user details from frontend (from form or json - can be accessed from req.body)
   const {fullName, email, username, password} = req.body
   console.log("email: ", email)
   // validation - not empty
   /* if (fullName === ""){
    throw new ApiError(400, "Full name is required")
   }
    */
   if(
    [fullName, email, username, password].some(()=>
    field?.trim()=== "")
   ){
    throw new ApiError(400, "All fields are required")
   }
   // check if user already exists: username, email
   const existedUser = User.findOne({
    $or:[{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409, "User with email or username already exists")
   }
   // check for images, check for avatar
   const avatarLocalPath = req.files?.avatar[0]?.path         //access to req.files by multer
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }
   // upload them to cloudinary, recheck for avatar
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }
   // create user object (mongoDB a no-sql db) - create entry in db
   const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "" , //bcz we havent checked before for coverImage 
    email,
    password,
    username: username.toLowerCase()
   })
   // remove password and refresh token field from response
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   // check for user creation 
   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user.")
   }
   // return res if user created else error
   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registed successfully")
   )
}) 

export {
    registerUser,
}