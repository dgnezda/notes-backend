import { Note } from 'entities/note.entity'

// Base Email Template Function
function getBaseEmailTemplate(options: {
  title: string
  content: string
  buttonText?: string
  buttonLink?: string
  additionalContent?: string
}): string {
  const { title, content, buttonText, buttonLink, additionalContent } = options

  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f6f6f4;
          color: #071015;
          margin: 0;
          padding: 20px;
        }
        h1 {
          font-size: x-large;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .header {
          margin-bottom: 20px;
        }
        .content {
          text-align: left;
          font-size: medium;
          line-height: 1.5;
        }
        .btn-container {
          margin: 30px 0;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0d99ff;
          color: #fff !important;
          text-decoration: none;
          border-radius: 5px;
          font-size: medium;
        }
        .footer {
          margin-top: 20px;
          font-size: small;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M21 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M21 23L36 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M36 23V12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M36 23L51 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M51 23L51 1" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M1.8064 22L0.999991 22.5914" stroke="black" stroke-width="2" stroke-linecap="round" />
          </svg>
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        ${
          buttonText && buttonLink
            ? `
          <div class="btn-container">
            <a href="${buttonLink}" class="btn">${buttonText}</a>
          </div>
        `
            : ''
        }
        ${
          additionalContent
            ? `
          <div class="content-sm">
            ${additionalContent}
          </div>
        `
            : ''
        }
        <div class="footer">
          <p>Thank you for using .md notes!</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Get Reset Password HTML Email String
export function getPasswordResetEmail(resetLink: string): string {
  const title = 'Password Reset Request'
  const content = `
    <p>Hello,</p>
    <p>You requested a password reset for your .md notes account.</p>
    <p>Please click the button below to reset your password:</p>
  `
  const buttonText = 'Reset Password'
  const buttonLink = resetLink
  const additionalContent = `
    <p>If you did not request this, please ignore this email.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// Get Confirm Email HTML Email String
export function getEmailConfirmationEmail(confirmLink: string): string {
  const title = 'Email Confirmation'
  const content = `
    <p>Hello,</p>
    <p>Thank you for registering with .md notes.</p>
    <p>Please confirm your email address by clicking the button below:</p>
  `
  const buttonText = 'Confirm Email'
  const buttonLink = confirmLink
  const additionalContent = `
    <p>If you did not create this account, please ignore this email. No further action is required.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// Get Share Note Internally Email String
export function getInternalNoteShareEmail(noteTitle: string, noteLink: string): string {
  const title = 'Note Shared with You'
  const content = `
    <p>Hello,</p>
    <p>A note titled "<strong>${noteTitle}</strong>" has been shared with you.</p>
    <p>Click the button below to view it:</p>
  `
  const buttonText = 'View Note'
  const buttonLink = noteLink
  const additionalContent = `
    <p>If you have any questions, please contact support.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// Get Share Note to Non-Existing User Email String
export function getExternalNoteShareEmail(noteTitle: string, registerLink: string): string {
  const title = 'A Note Has Been Shared with You'
  const content = `
    <p>Hello,</p>
    <p>An .md notes user has shared a note titled "<strong>${noteTitle}</strong>" with you.</p>
    <p>To view the note, please register:</p>
  `
  const buttonText = 'Register Now'
  const buttonLink = registerLink
  const additionalContent = `
    <p>If you did not expect this, you can safely ignore this email.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// Welcome Email
export function getWelcomeEmail(userName: string): string {
  const title = 'Welcome to .md notes!'
  const content = `
    <p>Hello ${userName},</p>
    <p>We're excited to have you on board. Your registration is now complete.</p>
    <p>You can start using .md notes by clicking the button below:</p>
  `
  const buttonText = 'Log In'
  const buttonLink = 'www.dotmd.ink/login'
  const additionalContent = `
    <p>If you have any questions, feel free to reach out to our support team.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}
