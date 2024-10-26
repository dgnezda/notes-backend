import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class NotesService {
  private notesFolder: string;
  private readonly logger = new Logger(NotesService.name);

  constructor(private configService: ConfigService) {
    this.notesFolder = this.configService.get<string>('NOTES_FOLDER') || 'notes';
  }

  private getFilePath(filename: string): string {
    return path.join(this.notesFolder, `${filename}.md`);
  }

  private validateFilename(filename: string): void {
    const validFilenameRegex = /^[a-zA-Z0-9-_]+$/;
    if (!validFilenameRegex.test(filename)) {
      throw new BadRequestException('Invalid filename. Only alphanumeric characters, hyphens, and underscores are allowed.');
    }
  }

  async createNote(filename: string, content: string): Promise<void> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      await fs.writeFile(filePath, content, 'utf8');
      this.logger.log(`Note created: ${filename}`);
    } catch (error) {
      this.logger.error(`Failed to create note: ${filename}`, error.stack);
      throw error;
    }
  }
  
  async readNote(filename: string): Promise<string> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      const content = await fs.readFile(filePath, 'utf8');
      this.logger.log(`Note read: ${filename}`);
      return content;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`Note with filename "${filename}" not found`);
      }
      throw error;
    }
  }

  async updateNote(filename: string, newContent: string): Promise<void> {
    this.validateFilename(filename);
    const filePath = this.getFilePath(filename);

    try {
      await fs.access(filePath); // Check if file exists
      await fs.writeFile(filePath, newContent, 'utf8');
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
      this.logger.log(`Note deleted: ${filename}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`Note with filename "${filename}" not found`);
      }
      this.logger.error(`Failed to delete note: ${filename}`, error.stack);
      throw error;
    }
  }
  
  async listNotes(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.notesFolder);
      this.logger.log('Listing all notes');
      return files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', '')); // Remove the .md extension
    } catch (error) {
      this.logger.error('Failed to list notes', error.stack);
      throw error;
    }
  }
}
