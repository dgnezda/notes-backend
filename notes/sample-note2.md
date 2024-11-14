Updated *content* for the

markdown note22222.

```python
def fizz_buzz(n):
	pass
```

Smart *stuff*

ho hoho

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../../services/app-state.service';
import { Observable } from 'rxjs';
import { Note } from '../../interfaces/note.interface';
import { Store } from '@ngrx/store';
import { selectIsEditing, selectSelectedNote } from '../../../services/note.selector';
import * as NoteActions from '../../../services/note.actions';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
  isEditing$: Observable<boolean>;
  selectedNote$: Observable<Note | null>;
  showExportOptions: boolean = false;

  constructor(private store: Store) {
    this.isEditing$ = this.store.select(selectIsEditing);
    this.selectedNote$ = this.store.select(selectSelectedNote);

  }

  toggleExportOptions(): void {
    this.showExportOptions = !this.showExportOptions;
  }

  insertTable(): void {
    const snippet = `\n| Column 1 | Column 2 | Column 3 |
                     \n| -------- | :------: | -------: |
                     \n| Text     | Text     | Text     |\n`;
    this.store.dispatch(NoteActions.insertSnippet({ snippet }));
  }

  insertLink(): void {
    const snippet = `\n[Link Text](https://example.com)\n`;
    this.store.dispatch(NoteActions.insertSnippet({ snippet }));
  }

  insertImage(): void {
    const snippet = `\n![Alt Text](path/to/image.png)\n`;
    this.store.dispatch(NoteActions.insertSnippet({ snippet }));
  }

  insertCode(): void {
    const snippet = '\n```language\n// Your code here\n```\n';
    this.store.dispatch(NoteActions.insertSnippet({ snippet }));
  }

  onAddNote(): void {
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const newFilename = `note_${date}.md`;
    const newNote: Note = {
      filename: newFilename,
      title: 'New Note',
      content: '',
      isPinned: false,
      createdAt: date,
      modifiedAt: date,
    };
    this.store.dispatch(NoteActions.createNote({ note: newNote }));
  }

  onToggleEditMode(): void {
    this.store.dispatch(NoteActions.toggleEditMode());
  }

  exportAsMarkdown(note: Note): void {
    const blob = new Blob([note.content], { type: 'text/markdown;charset=utf-8' });
    const filename = `${note.title}.md`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    this.showExportOptions = false;
  }

  exportAsPDF(note: Note): void {
    const element = document.getElementById('rendered-markdown');
    if (element) {
      const options = {
        margin: [25, 15, 25, 15], // top, left, bottom, right
        filename: `${note.title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 3, // Higher is better quality
          useCORS: true, 
        },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      };

      html2pdf()
        .set(options)
        .from(element)
        .save()
        .finally(() => {
          this.showExportOptions = false;
        });
        this.showExportOptions = false;
    } else {
      console.error('Rendered markdown element not found');
      this.showExportOptions = false;
    }
  }
}

```
[Link Text](https://example.com)
