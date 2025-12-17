const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel} = require('../models');

exports.registerUser = async (req,res)=>{
    const {email,username,password} = req.body;

    const userExists = await userModel.findOne({email});
    if(userExists){
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await userModel.create({email,username,password: hashedPassword});
    res.status(201).json({message: 'User registered successfully'});
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const userExists = await bcrypt.compare(password, user.password);
    if (!userExists) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  
    res.json({ token });
  };