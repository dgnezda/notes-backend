import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import * as path from 'path';

export interface NoteMetadata {
  isPinned: boolean;
  createdAt: string;
  title: string;
}

export interface Note {
  filename: string
  content: string
  isPinned: boolean
  createdAt: string
}

@Injectable()
export class NotesService {
  private notesFolder: string;
  private metadataPath: string;
  private readonly logger = new Logger(NotesService.name);

  constructor(private configService: ConfigService) {
    this.notesFolder = this.configService.get<string>('NOTES_FOLDER') || 'notes';
    this.metadataPath = path.join(this.notesFolder, 'notes-metadata.json');
  }

  private getFilePath(filename: string): string {
    return path.join(this.notesFolder, `${filename}`);
  }

  private validateFilename(filename: string): void {
    const validFilenameRegex = /^[a-zA-Z0-9-_.]+$/;
    if (!validFilenameRegex.test(filename)) {
      throw new BadRequestException('Invalid filename. Only alphanumeric characters, hyphens, and underscores are allowed.');
    }
  }

  private async getMetadata(): Promise<Record<string, NoteMetadata>> {
    try {
      const data = await fs.readFile(this.metadataPath, 'utf8');
      return JSON.parse(data);
    } catch {
      return {}; // Return empty metadata if file doesn't exist or can't be read
    }
  }

  private async saveMetadata(metadata: Record<string, NoteMetadata>): Promise<void> {
    await fs.writeFile(this.metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
  }

  async createNote(filename: string, title: string, content: string): Promise<void> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      await fs.writeFile(filePath, content, 'utf8');

      const metadata = await this.getMetadata();
      metadata[filename] = { isPinned: false, createdAt: new Date().toISOString(), title: title };
      await this.saveMetadata(metadata);

      this.logger.log(`Note created: ${filename}`);
    } catch (error) {
      this.logger.error(`Failed to create note: ${filename}`, error.stack);
      throw error;
    }
  }

  async readNote(filename: string): Promise<{ content: string; metadata: NoteMetadata }> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      const content = await fs.readFile(filePath, 'utf8');
      const metadata = await this.getMetadata();

      if (!metadata[filename]) {
        throw new NotFoundException(`Metadata for note "${filename}" not found`);
      }

      this.logger.log(`Note read: ${filename}`);
      return { content, metadata: metadata[filename] };
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`Note with filename "${filename}" not found`);
      }
      throw error;
    }
  }

  async updateNote(filename: string, content: string, title?: string, isPinned?: boolean): Promise<void> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      await fs.access(filePath); // Check if file exists
      await fs.writeFile(filePath, content, 'utf8');

      const metadata = await this.getMetadata();
      if (metadata[filename]) {
        if (title !== undefined) {
          metadata[filename].title = title;
        }
        if (isPinned !== undefined) {
          metadata[filename].isPinned = isPinned;
        }
        await this.saveMetadata(metadata);
      }

      this.logger.log(`Note updated: ${filename}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`Note with filename "${filename}" not found`);
      }
      this.logger.error(`Failed to update note: ${filename}`, error.stack);
      throw error;
    }
  }

  async deleteNote(filename: string): Promise<void> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      await fs.unlink(filePath);

      const metadata = await this.getMetadata();
      delete metadata[filename];
      await this.saveMetadata(metadata);

      this.logger.log(`Note deleted: ${filename}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`Note with filename "${filename}" not found`);
      }
      this.logger.error(`Failed to delete note: ${filename}`, error.stack);
      throw error;
    }
  }

  async listNotes(): Promise<Note[]> {
    const metadata = await this.getMetadata();
    const files = await fs.readdir(this.notesFolder);

    return Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          // const filename = file.replace('.md', '');
          const meta = metadata[file];
          const content = await fs.readFile(`${this.notesFolder}/${file}`, 'utf-8'); // Read file content

          return { filename: file, title: meta.title, content, isPinned: meta.isPinned, createdAt: meta.createdAt };
        })
    );
}

  async pinNote(filename: string, pin: boolean): Promise<void> {
    this.validateFilename(filename);

    const metadata = await this.getMetadata();
    if (!metadata[filename]) {
      throw new NotFoundException(`Metadata for note "${filename}" not found`);
    }

    metadata[filename].isPinned = pin;
    await this.saveMetadata(metadata);

    this.logger.log(`Note ${pin ? 'pinned' : 'unpinned'}: ${filename}`);
  }
}
