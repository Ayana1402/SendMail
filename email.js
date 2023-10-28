const express = require('express')
const app = express()
const nodemailer = require("nodemailer");
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.json())



/** send mail from testing account */
app.post('/user',async(req,res)=>{

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Congratulations! You've Been Selected for the FSD Course at ICT Academy", // Subject line
        text: "We look forward to welcoming you to the ICT Academy community. Congratulations once again on your selection. We believe you will make the most out of this opportunity and wish you the best of luck in your learning journey.", // plain text body
       // html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
})
app.listen(3000,()=>{
    console.log("Server started")
})

