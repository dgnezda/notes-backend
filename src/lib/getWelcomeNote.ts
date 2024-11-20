export default function getWelcomeNote(): string {
  return `
    Welcome to .md notes
========

A short overview of the things you can do with the app:
- quickly add notes with markdown, and see them formatted nicely
- use snippet buttons (top-middle) for quick insertions of more involved md
- export and download notes as .md or .pdf files

Hint: click **Edit** to see how this welcome note was formatted! Hope you enjoy my app!

Keyboard shortcuts for common tasks:
- \`Ctrl + Alt + N\`: Add new note
- \`Ctrl + Alt + E\`: Enter/exit edit mode
- \`Ctrl + Alt + X\`: Open export file dialog
- \`Ctrl + Alt + P\`: Export as .pdf
- \`Ctrl + Alt + M\`: Export as .md
- \`Ctrl + Alt + U\`: Toggle pin/unpin selected note

Note: Replace Ctrl + Alt with \`Ctrl + Optio\` on **macOS**!  

You can use most common markdown styling annotations, such as:

- headings
- emphasis
- lists
- links
- images
- code snippets and inline code
- tables
- blockquotes
- horizontal rules
- inline HTML
- video links
- and more

----

Examples:


| Column 1 | Column 2 | Column 3 |
| -------- | :------: | -------: |
| Text     | Text     | Text     |

[Link Text](https://google.com)

![Alt Text](https://img.freepik.com/free-photo/close-up-portrait-beautiful-cat_23-2149214419.jpg)

\`\`\`language
// Your code here with a neat copy to clipboard button on the right =>
\`\`\`

<a href="http://www.youtube.com/watch?feature=player_embedded&v=5-aK2_WwrmM
" target="_blank"><img src="http://img.youtube.com/vi/5-aK2_WwrmM/0.jpg" 
alt="Pimp my powershell" width="240" height="180" border="10" /></a>
`
}
