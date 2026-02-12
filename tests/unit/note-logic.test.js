import { describe, it, expect } from 'vitest';
import {
  validateNote,
  sortNotes,
  filterNotes,
  formatNotePreview,
} from '../../src/core/note-logic.js';

describe('validateNote', () => {
  it('should accept a valid note', () => {
    const result = validateNote({ title: 'Test', content: 'Content' });
    expect(result.valid).toBe(true);
    expect(result.message).toBe('');
  });

  it('should reject null input', () => {
    const result = validateNote(null);
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Invalid note object');
  });

  it('should reject non-object input', () => {
    const result = validateNote('string');
    expect(result.valid).toBe(false);
  });

  it('should reject empty title', () => {
    const result = validateNote({ title: '', content: 'Content' });
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Title is required');
  });

  it('should reject whitespace-only title', () => {
    const result = validateNote({ title: '   ', content: 'Content' });
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Title is required');
  });

  it('should reject title exceeding max length', () => {
    const result = validateNote({ title: 'A'.repeat(101), content: '' });
    expect(result.valid).toBe(false);
    expect(result.message).toContain('under 100');
  });

  it('should accept title at max length', () => {
    const result = validateNote({ title: 'A'.repeat(100), content: '' });
    expect(result.valid).toBe(true);
  });

  it('should reject content exceeding max length', () => {
    const result = validateNote({ title: 'Test', content: 'A'.repeat(5001) });
    expect(result.valid).toBe(false);
    expect(result.message).toContain('under 5000');
  });

  it('should accept note without content', () => {
    const result = validateNote({ title: 'Test' });
    expect(result.valid).toBe(true);
  });
});

describe('sortNotes', () => {
  it('should sort notes by createdAt descending', () => {
    const notes = [
      { title: 'Old', createdAt: 1000 },
      { title: 'New', createdAt: 3000 },
      { title: 'Mid', createdAt: 2000 },
    ];
    const sorted = sortNotes(notes);
    expect(sorted[0].title).toBe('New');
    expect(sorted[1].title).toBe('Mid');
    expect(sorted[2].title).toBe('Old');
  });

  it('should return empty array for null input', () => {
    expect(sortNotes(null)).toEqual([]);
  });

  it('should return empty array for non-array input', () => {
    expect(sortNotes('not an array')).toEqual([]);
  });

  it('should not mutate the original array', () => {
    const notes = [{ title: 'A', createdAt: 2 }, { title: 'B', createdAt: 1 }];
    const sorted = sortNotes(notes);
    expect(notes[0].title).toBe('A');
    expect(sorted[0].title).toBe('A');
  });

  it('should handle notes without createdAt', () => {
    const notes = [{ title: 'A' }, { title: 'B', createdAt: 1000 }];
    const sorted = sortNotes(notes);
    expect(sorted).toHaveLength(2);
  });
});

describe('filterNotes', () => {
  const notes = [
    { title: 'Shopping List', content: 'Buy milk and eggs' },
    { title: 'Meeting Notes', content: 'Discuss project timeline' },
    { title: 'Ideas', content: 'New app concept' },
  ];

  it('should filter by title match', () => {
    const result = filterNotes(notes, 'shopping');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Shopping List');
  });

  it('should filter by content match', () => {
    const result = filterNotes(notes, 'milk');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Shopping List');
  });

  it('should be case insensitive', () => {
    const result = filterNotes(notes, 'MEETING');
    expect(result).toHaveLength(1);
  });

  it('should return all notes for empty query', () => {
    expect(filterNotes(notes, '')).toHaveLength(3);
    expect(filterNotes(notes, null)).toHaveLength(3);
    expect(filterNotes(notes, '   ')).toHaveLength(3);
  });

  it('should return empty array for no matches', () => {
    const result = filterNotes(notes, 'xyz123');
    expect(result).toHaveLength(0);
  });
});

describe('formatNotePreview', () => {
  it('should return full content if under max length', () => {
    expect(formatNotePreview('Short text')).toBe('Short text');
  });

  it('should truncate long content with ellipsis', () => {
    const long = 'A'.repeat(150);
    const result = formatNotePreview(long, 100);
    expect(result.length).toBeLessThanOrEqual(103); // 100 + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  it('should return empty string for null content', () => {
    expect(formatNotePreview(null)).toBe('');
  });

  it('should return empty string for undefined content', () => {
    expect(formatNotePreview(undefined)).toBe('');
  });

  it('should respect custom max length', () => {
    const result = formatNotePreview('Hello World', 5);
    expect(result).toBe('Hello...');
  });
});
