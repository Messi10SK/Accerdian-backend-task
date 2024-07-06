const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { z } = require('zod');
const cors = require('cors')
const path = require('path')

dotenv.config();


__dirname = path.resolve()

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());



app.use(express.static(path.join(__dirname,'/frontend/dist')));

const referralBody = z.object({
    referrer: z.string().min(1, { message: "Referrer is required" }),
    referee: z.string().min(1, { message: "Referee is required" }),
    email: z.string().email({ message: "Invalid email address" }),
});

app.post('/api/referrals', async (req, res) => {
  const result = referralBody.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.errors[0].message;
    return res.status(400).json({ error: firstError });
  }

  const { referrer, referee, email } = result.data;

  try {
    const newReferral = await prisma.referral.create({
      data: { referrer, referee, email },
    });


    const auth = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailMaterial = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Referral from ' + referrer,
      text: `${referrer} has referred you dear ${referee}!`,
    };

    auth.sendMail(mailMaterial, (error, info) => {
      if (error) {
        console.error('Email send error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(newReferral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend' ,'dist','index.html'));
})