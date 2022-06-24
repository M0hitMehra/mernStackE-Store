const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//REgister A User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, password, email } = req.body;
  
  const user = await User.create({
    name,
    password,
    email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  console.log(email, password);
  const user = await User.findOne({ email }).select("+password");

  if (!user) {  
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//logout  USER

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `Your reset password token is :- \n\n${url} \n\nIf you have not requested this email then ,Please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Reset`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
  console.log(message);
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid Token or Token Expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password Does Not Match To Confirm Password", 400)
    );
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// Get user Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

//Update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is not correct", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Old Password is not same as new password", 401)
    );
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

//Update User  Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  
  if(req.body.avatar !== ""){
    console.log(123)
 const user = await User.findById(req.user.id)
 const imageId = user.avatar.public_id
  
 await cloudinary.v2.uploader.destroy(imageId)

 const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar ,{
  folder:"avatars",
  width:150,
  crop:"scale",
 })

  newUserData.avatar = {
    public_id: myCloud.public_id,
    url:myCloud.secure_url
  }
}
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, user });
});

// get All Users [ADMIN]
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

//get Single user Detail [ADMIN]

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with ID : ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, user });
});

//Update User  Role --- [ADMIN]
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  let user =  User.findById(req.params.id)
  
  if (!user) {
    return next(
      new ErrorHandler(`User not found with ID :${req.params.id}`, 400)
    );
  }
  
  user = await User.findByIdAndUpdate(req.params.id, newUserData, {
  new: true,
  runValidators: true,
  useFindAndModify: false,
});


  

  res.status(200).json({ success: true, user });
});

//Delete User  ----[ADMIN]
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with ID :${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id
  
  await cloudinary.v2.uploader.destroy(imageId)

  await user.remove();

  res.status(200).json({ success: true, message: "User removed successfully" });
});
