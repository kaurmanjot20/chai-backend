import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens = async(userId)=> {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}
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
    [fullName, email, username, password].some(field=>
    field?.trim()=== "")
   ){
    throw new ApiError(400, "All fields are required")
   }
   // check if user already exists: username, email
   const existedUser = await User.findOne({
    $or:[{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409, "User with email or username already exists")
   }
   console.log(req.files)
   // check for images, check for avatar
   const avatarLocalPath = req.files?.avatar?.[0]?.path         //access to req.files by multer
   const coverImageLocalPath = req.files?.coverImage?.[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }
   // upload them to cloudinary, recheck for avatar
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage =  coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath): null

   if(!avatar || !avatar.url){
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

// req body -> data
// username or email based access
// find the user
// password check
// access & refresh token 
// send cookie
const loginUser = asyncHandler(async (req,res)=>{
    // req body -> data
    const {email, username, password} = req.body;
    // username or email based access ur wish
    if(!username || !email){
        throw new ApiError(400, "username or email is required")
    }

    // find the user
    // User.findOne({username}) or User.findOne({email}) can be used to find using user on basis of either of them 
    const user  = await User.findOne({   // User in other continent so await
        $or: [{username},{email}]
    })
    if(!user){
        throw new ApiError(400, "user doesn't exist")
    }
    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }
    // access & refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // send cookie
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken // good practice to send here too
            },
            "User logged in successfully"
        )
    )

})

//logout
//clear cookies
// reset refreshToken
const loggoutUser = asyncHandler(async(req,res)=>{
    
})

export {
    registerUser,
    loginUser,
}