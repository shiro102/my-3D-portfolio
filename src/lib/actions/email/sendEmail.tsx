'use server'

import { Resend } from 'resend'

// Interfaces and Types 
interface EmailTemplateProps {
  name: string
  email: string
  message: string
}
interface SendEmailTemplateProps {
  name: string
  email: string
  subject: string 
  message: string
}

// Email Components
const EmailTemplate = ({ name, email, message }: EmailTemplateProps) => {
  return (
    <div>
      <h1>An email has been sent from: {name}, Email: {email}</h1>
      <p>
        {message}
      </p>
    </div>
  )
}

export async function sendEmail({ name, email, message, subject }: SendEmailTemplateProps) {
  const resend = new Resend(process.env.RESEND_API_KEY_PRODUCTION)
  const { error } =  await resend.emails.send({
    from: 'Admin <admin@khaihung.dev>',
    to: 'khaihungluong@gmail.com',
    subject: subject,
    react: <EmailTemplate name={name} email={email} message={message} />,
  })

  console.log(error)
}
