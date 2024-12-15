import { Note } from 'entities/note.entity'

// Base Email Template
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
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f6f6f4; color: #071015; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
        <div style="margin-bottom: 20px;">
          <img src="https://api.dotmd.ink/logo2.png" alt="Logo" width="106" height="50" style="margin-bottome: 20px;" />
          <h1 style="font-size: large; margin-top: 10px;">${title}</h1>
        </div>
        <div style="text-align: left; font-size: small; line-height: 1.2; margin-left: 12%;">
          ${content}
        </div>
        ${
          buttonText && buttonLink
            ? `
        <div style="margin: 30px 0;">
          <a href="${buttonLink}" style="display: inline-block; padding: 10px 20px; background-color: #0D0D0D; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-size: small;">${buttonText}</a>
        </div>
        `
            : ''
        }
        ${
          additionalContent
            ? `
        <div style="text-align: center; font-size: x-small; color: #555;">
          ${additionalContent}
        </div>
        `
            : ''
        }
        <div style="margin-top: 20px; font-size: small; color: #555;">
          <p>Thank you for using <a href="https://dotmd.ink">dotmd.ink</a> notes!</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Get Reset Password HTML Email String
export function getPasswordResetEmail(resetLink: string): string {
  const title = 'Password Reset Request for your dotmd.ink account'
  const content = `
    <p>Hello,</p>
    <p>You requested a password reset for your <strong><a href="https://dotmd.ink">dotmd.ink</a></strong> account.</p>
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
  const title = 'Email Confirmation for dotmd.ink'
  const content = `
    <p>Hello,</p>
    <p>Thank you for registering with <strong><a href="https://dotmd.ink">dotmd.ink</a></strong>.</p>
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
export function getInternalNoteShareEmail(noteTitle: string, shareLink: string, name: string): string {
  const title = `${name} Shared a dotmd.ink Note Document with You!`
  const content = `
    <p>Hello,</p>
    <p>${name} has shared a note titled "<strong>${noteTitle}</strong>" with you.</p>
    <p>Click the button below to view it:</p>
  `
  const buttonText = 'View Note'
  const buttonLink = shareLink
  const additionalContent = `
    <p>If you did not expect this, you can safely ignore this email or contact <a href="mailto:support@dotmd.ink">support</a>.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// Get Share Note to Non-Existing User Email String
export function getExternalNoteShareEmail(noteTitle: string, shareLink: string, name: string): string {
  const title = `${name} Shared a dotmd.ink Note Document with You!`
  const content = `
    <p>Hello,</p>
    <p>${name} has shared a note titled "<strong>${noteTitle}</strong>" with you.</p>
    <p>To view the note and sign up, please click below:</p>
  `
  const buttonText = 'View Note'
  const buttonLink = shareLink
  const additionalContent = `
    <p>If you did not expect this, you can safely ignore this email or contact <a href="mailto:support@dotmd.ink">support</a>.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// Welcome Email
export function getWelcomeEmail(userName: string): string {
  const title = 'Welcome to dotmd.ink!'
  const content = `
    <p>Hello ${userName},</p>
    <p>We're excited to have you on board. Your registration is now complete.</p>
    <p>You can start using <strong><a href="https://dotmd.ink">dotmd.ink</a></strong> to create fabulous markdown notes by clicking the button below:</p>
  `
  const buttonText = 'Log In'
  const buttonLink = 'https://dotmd.ink/login'
  const additionalContent = `
    <p>If you have any questions, feel free to reach out to our <a href="mailto:support@dotmd.ink">support</a> team.</p>
  `

  return getBaseEmailTemplate({ title, content, buttonText, buttonLink, additionalContent })
}

// ALT BASE TEMPLATE
// <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f6f4; margin: 0; padding: 20px; width: 100%;">
//   <tr>
//     <td align="center">
//       <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
//         <tr>
//           <td style="text-align: center; margin-bottom: 20px;">
//             <img src="https://your-domain.com/path-to-logo/logo.png" alt="Logo" width="52" height="24" />
//             <h1 style="font-size: x-large; margin: 0;">${title}</h1>
//           </td>
//         </tr>
//         <tr>
//           <td style="text-align: left; font-size: medium; line-height: 1.5;">
//             ${content}
//           </td>
//         </tr>
//         ${buttonText && buttonLink
//           ? `
//         <tr>
//           <td style="text-align: center; margin: 30px 0;">
//             <a href="${buttonLink}" style="display: inline-block; padding: 10px 20px; background-color: #0D0D0D; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-size: medium;">${buttonText}</a>
//           </td>
//         </tr>
//         `
//           : ''}
//         ${additionalContent
//           ? `
//         <tr>
//           <td style="text-align: left; font-size: small; color: #555;">
//             ${additionalContent}
//           </td>
//         </tr>
//         `
//           : ''}
//         <tr>
//           <td style="margin-top: 20px; font-size: small; color: #555; text-align: center;">
//             <p>Thank you for using .md notes!</p>
//           </td>
//         </tr>
//       </table>
//     </td>
//   </tr>
// </table>
