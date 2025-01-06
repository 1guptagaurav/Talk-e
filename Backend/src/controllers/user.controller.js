import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (id) => {
  const user = await User.findById(id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  user.save({ ValideBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (
    [fullname, email, password].some((field) => !field || field?.trim() === "")
  ) {
    throw new ApiError(403,"All fields are necessary");
    // return res.status(403).json({ message: "All fields are required" });
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(401, "User already registered");
  }
  const picLocalPath = req.file?.path;
  let pic;
  if (picLocalPath) {
    pic = await uploadOnCloudinary(picLocalPath);
  }
  const user = await User.create({
    fullname,
    email,
    password,
    pic,
  });

  const createduser = await User.findById(user._id).select("-password -refreshToken");
  if (!createduser) {
    throw new ApiError(500, "Cannnot Register User");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User Successfully Registered"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill all the fields");
  }
  const user = await User.findOne( {email} );
  if (!user) {
    throw new ApiError(400, "User not registered");
  }
  const checkPassword = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new ApiError(400, "Wrong Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const updatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  };
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: updatedUser,
          accessToken,
          refreshToken,
        },
        "User Successfully logged in"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out Successfully"));
});

const getAllUser=asyncHandler(async(req,res)=>{
  const keyword=req.query.search ? {
    $or:[
      {fullname:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}}
    ]
  }:{}

  const users=await User.find(keyword).find({_id:{$ne:req.user._id }})
  res.send(users)
})

export { registerUser, loginUser, logoutUser, getAllUser };
