const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

var users = [
    {
        email: "akilan@gmail.com",
        password:"12345678"
    }
]
app.post("/signin", (req, res) => {
    const { useremail, userpassword } = req.body;
    if (!useremail || !userpassword) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        })
    }
    const extinguser = users.find(
        (user) => user.email === useremail
    )
    if (extinguser) {
        return res.status(409).json({
            success: false,
            message: "Account already exists.please login."
        })
    }
    users.push({
        email: useremail,
        password: userpassword
    })
    return res.status(201).json({
        success: true,
        message: "Signup successful"
    })
})
app.post("/login", (req, res) => {
    const { useremail, userpassword } = req.body

    const founduser = users.find((user) =>
        user.email === useremail &&
        user.password === userpassword
    )
    if (founduser) {
        return res.json({
            success: true,
            message: "Login successful"
        })
    }
    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    })

})




app.listen(5000,"0.0.0.0", () => {
    console.log("Port 5000 start ....")
})