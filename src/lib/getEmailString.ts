import { Note } from "entities/note.entity"

// GET Reset Password HTML Email String 
export function getResetPwHtmlEmailString(restLink: string): string {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #F6F6F4;
                  color: #071015;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #FFFFFF;
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
                  background-color: #F4FF47;
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
              .btn-container {
                  text-align: center;
              }
              .btn {
                  display: inline-block;
                  background-color: #F4FF47;
                  color: #071015;
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
              .footer {
                  font-size: 14px;
                  color: #777777;
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
                        <path d="M6 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M21 23L21 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M21 23L36 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M36 23V12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M36 23L51 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M51 23L51 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1.8064 22L0.999991 22.5914" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>You have requested to reset your password. Please click the button below to proceed:</p>
              </div>
              <div class="btn-container">
                  <a href="${restLink}" class="btn">Reset Password</a>
              </div>
              <div class="content">
                  <p>If you did not request this, please ignore this email. Your password will remain unchanged, and no further action is required.</p>
              </div>
              <div class="footer">
                  <p>Thank you for using .md notes!</p>
              </div>
          </div>
      </body>
    </html>`
}

// GET Confirm Email HTML Email String
export function getConfirmEmailHtmlEmailString(link: string, userEmailL: string): string {
    return ''
}

// GET Share Note By Email to Existing User HTML String
export function getShareNoteInternallyEmailString(note: Note): string {
    return ''
}

// GET Share Note By Email to Non-Existing User HTML String
export function getShareNoteToOtherString(note: Note): string {
    return ''
}