import { Note } from 'entities/note.entity'

// GET Reset Password HTML Email String
export function getResetPwHtmlEmailString(resetLink: string): string {
  return `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
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
      .logo-container {
        display: inline-block;
        width: 64px;
        height: 64px;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px auto;
      }
      .content {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
        text-align: left;
      }
      .content-sm {
        font-size: 14px;
        line-height: 1.5;
        margin: 20px 0;
        text-align: center;
      }
      .btn-container {
        text-align: center;
      }
      .btn {
        display: inline-block;
        background-color: #0396a6;
        color: #fff;
        text-decoration: none;
        padding: 4px 20px;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 700;
        width: auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .btn:hover {
        background-color: #4eb4bf;
      }
      .footer {
        font-size: 14px;
        color: #071015;
        text-align: center;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M21 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M21 23L36 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M36 23V12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M36 23L51 12" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M51 23L51 1" stroke="black" stroke-width="2" stroke-linecap="round" />
            <path d="M1.8064 22L0.999991 22.5914" stroke="black" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the button below to proceed:</p>
      </div>
      <div class="btn-container">
        <a href="${resetLink}" class="btn">Reset Password</a>
      </div>
      <div class="content-sm">
        <p>
          If you did not request this, please ignore this email. Your password will remain unchanged, and no further
          action is required.
        </p>
      </div>
      <div class="footer">
        <p>Thank you for using .md notes!</p>
      </div>
    </div>
  </body>
</html>
`
}

// GET Confirm New User Email HTML Email String
export function getConfirmEmailHtmlEmailString(confirmLink: string): string {
  return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Confirmation</title>
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
      .logo-container {
        display: inline-block;
        width: 64px;
        height: 64px;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px auto;
      }
      .content {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
        text-align: left;
      }
      .content-sm {
        font-size: 14px;
        line-height: 1.5;
        margin: 20px 0;
        text-align: left;
      }
      .btn-container {
        text-align: center;
      }
      .btn {
        display: inline-block;
        background-color: #0396a6;
        color: #fff;
        text-decoration: none;
        padding: 4px 20px;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 700;
        width: auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .btn:hover {
        background-color: #4eb4bf;
      }
      .footer {
        font-size: 14px;
        color: #071015;
        text-align: center;
        margin-top: 30px;
      }
    </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-container">
              <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M21 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M21 23L36 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M36 23V12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M36 23L51 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M51 23L51 1" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M1.8064 22L0.999991 22.5914" stroke="black" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <h1>Email Confirmation</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>
              Thank you for registering with .md notes. Please confirm your email address by clicking the button below:
            </p>
          </div>
          <div class="btn-container">
            <a href="${confirmLink}" class="btn">Confirm Email</a>
          </div>
          <div class="content-sm">
            <p>
              If you did not create this account, please ignore this email. No further action is required.
            </p>
          </div>
          <div class="footer">
            <p>Thank you for using .md notes!</p>
          </div>
        </div>
      </body>
      </html>
    `
}

// GET Share Note By Email to Existing User HTML String
export function getShareNoteInternallyEmailString(note: Note, noteLink: string): string {
  const noteTitle = note.title
  return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>A note was shared with you!</title>
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
            .logo-container {
                display: inline-block;
                width: 64px;
                height: 64px;
                background-color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 10px auto;
            }
            .content {
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 20px;
                text-align: left;
            }
            .content-sm {
                font-size: 14px;
                line-height: 1.5;
                margin: 20px 0;
                text-align: center;
            }
            .btn-container {
                text-align: center;
            }
            .btn {
                display: inline-block;
                background-color: #0396a6;
                color: #fff;
                text-decoration: none;
                padding: 4px 20px;
                border-radius: 20px;
                font-size: 16px;
                font-weight: 700;
                width: auto;
                height: 40px;
                line-height: 40px;
                text-align: center;
            }
            .btn:hover {
                background-color: #4eb4bf;
            }
            .footer {
                font-size: 14px;
                color: #071015;
                text-align: center;
                margin-top: 30px;
            }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-container">
              <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M21 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M21 23L36 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M36 23V12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M36 23L51 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M51 23L51 1" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M1.8064 22L0.999991 22.5914" stroke="black" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <h1>Note Shared with You</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>
              A note titled "<strong>${noteTitle}</strong>" has been shared with you. Click the button below to view it:
            </p>
          </div>
          <div class="btn-container">
            <a href="${noteLink}" class="btn">View Note</a>
          </div>
          <div class="content-sm">
            <p>
              If you have any questions, please contact support.
            </p>
          </div>
          <div class="footer">
            <p>Thank you for using .md notes!</p>
          </div>
        </div>
      </body>
      </html>
    `
}

// GET Share Note By Email to Non-Existing User HTML String
export function getShareNoteToOtherString(note: Note, registerLink: string): string {
  const noteTitle = note.title
  return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>A note was shared with you!</title>
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
        .logo-container {
          display: inline-block;
          width: 64px;
          height: 64px;
          background-color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px auto;
        }
        .content {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
          text-align: left;
        }
        .content-sm {
          font-size: 14px;
          line-height: 1.5;
          margin: 20px 0;
          text-align: center;
        }
        .btn-container {
          text-align: center;
        }
        .btn {
          display: inline-block;
          background-color: #0396a6;
          color: #fff;
          text-decoration: none;
          padding: 4px 20px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 700;
          width: auto;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        .btn:hover {
          background-color: #4eb4bf;
        }
        .footer {
          font-size: 14px;
          color: #071015;
          text-align: center;
          margin-top: 30px;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-container">
              <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M21 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M21 23L36 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M36 23V12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M36 23L51 12" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M51 23L51 1" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M1.8064 22L0.999991 22.5914" stroke="black" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <h1>A Note Has Been Shared with You</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>
              An .md notes user has shared a note titled "<strong>${noteTitle}</strong>" with you. To view the note, please register:
            </p>
          </div>
          <div class="btn-container">
            <a href="${registerLink}" class="btn">Register Now</a>
          </div>
          <div class="content-sm">
            <p>
              If you did not expect this, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>Thank you from .md notes!</p>
          </div>
        </div>
      </body>
    </html>
  `
}
