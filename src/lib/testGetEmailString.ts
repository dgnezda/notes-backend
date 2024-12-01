import { writeFile } from 'fs'
import { join } from 'path'
import {
  getPasswordResetEmail,
  getEmailConfirmationEmail,
  getExternalNoteShareEmail,
  getInternalNoteShareEmail,
  getWelcomeEmail,
} from './getEmailString'

// ************************************************ //
// TO RUN SCRIPT FROM CMD:                          //
// 1. cmd into ~/src/lib                            //
// 2. run `npx ts-node testGetEmailString.ts`       //
//                                                  //
// Script generates 5 html files of email templates //
// ************************************************ //

const resetLink = 'http://localhost:3000/reset-password?token=exampleToken'
const noteLink = 'http://localhost:3000/notes/some-id-string'
const pwdRsHtml = getPasswordResetEmail(resetLink)
const emailConfHtml = getEmailConfirmationEmail(resetLink)
const extNoteEmail = getExternalNoteShareEmail('This neat note', noteLink)
const intNoteEmail = getInternalNoteShareEmail('This neater note', noteLink)
const welcEmail = getWelcomeEmail('Jacko')

const filePath = join(__dirname, 'password_reset_email.html')
const filePath2 = join(__dirname, 'email_conf.html')
const filePath3 = join(__dirname, 'external_note.html')
const filePath4 = join(__dirname, 'internal_note.html')
const filePath5 = join(__dirname, 'welcome.html')

const filepaths = [filePath, filePath2, filePath3, filePath4, filePath5]
const htmls = [pwdRsHtml, emailConfHtml, extNoteEmail, intNoteEmail, welcEmail]

for (let i = 0; i < filepaths.length; i++) {
  writeFile(filepaths[i], htmls[i], (err) => {
    if (err) {
      console.error('Error writing file:', err)
    } else {
      console.log(`Email template saved as ${filepaths[i]}`)
    }
  })
}
