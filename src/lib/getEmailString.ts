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
          <div class="content">
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

// GET Reset Password HTML Email String
export function getResetPwHtmlEmailString(resetLink: string): string {
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

// GET Confirm Email HTML Email String
export function getConfirmEmailHtmlEmailString(confirmLink: string): string {
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

// GET Share Note Internally Email String
export function getShareNoteInternallyEmailString(note: Note, noteLink: string): string {
  const title = 'Note Shared with You'
  const content = `
    <p>Hello,</p>
    <p>A note titled "<strong>${note.title}</strong>" has been shared with you.</p>
    <p>Click the button below to view it:</p>
  `
  const buttonText = 'View Note'
  const buttonLink = noteLink
  const additionalContent = `
    <p>If you have any questions, please contact support.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// GET Share Note to Non-Existing User Email String
export function getShareNoteToOtherString(note: Note, registerLink: string): string {
  const title = 'A Note Has Been Shared with You'
  const content = `
    <p>Hello,</p>
    <p>An .md notes user has shared a note titled "<strong>${note.title}</strong>" with you.</p>
    <p>To view the note, please register:</p>
  `
  const buttonText = 'Register Now'
  const buttonLink = registerLink
  const additionalContent = `
    <p>If you did not expect this, you can safely ignore this email.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}
