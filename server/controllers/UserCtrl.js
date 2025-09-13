const User = require("../model/User");
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')


//  Setup email (Gmail SMPT)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.register = async (req, res) => {
    const {email, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({email, password: hashed});
    res.send('User registered');
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send('If user exists, then password reset email shall be sent')

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; //1hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const message = `Click to reset password: ${resetLink}`;

    await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: message
    });

    res.send('if user exists, password reset email shall be sent');
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password} = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).send('Invalid or expired token');

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.send('Password reset successfull')
}

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password }); // <-- log incoming data

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User does not exist');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');

        res.send('Login successful');
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error');
    }
};
