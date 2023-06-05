import { Request, ResponseToolkit } from 'hapi';
import { nanoid } from 'nanoid';

// TODO: Fix the approach of implementing optional properties
// Cuz: At some point those optional props are EXTREMELY necessary, it's the main structure.
// Suggestion: Create a class or another interface to make Optional<Note> only when adding new note
interface Note {
	id?: string;
	title: string;
	body: string;
	tag: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

class NotesService {
	private notes: Note[];
	constructor() {
		this.notes = [];
	}

	/**
	 *
	 * @param request request object
	 * @returns note id if success. Otherwise, return error message
	 */
	public addNote(request: Request) {
		const { title, body, tag } = request.payload as Note;
		const id = nanoid(8);

		const createdAt = new Date();
		const updatedAt = createdAt;

		const newNote: Note = {
			id,
			title,
			body,
			tag,
			createdAt,
			updatedAt,
		};

		this.notes.push(newNote);

		const isNoteAdded = this.notes.filter(note => note.id === id).length > 0;

		if (!isNoteAdded) throw new Error('Failed to add the note!');

		return id;
	}

	public getNotes() {
		return this.notes;
	}

	public getNoteByID(id: string) {
		const note = this.notes.filter(n => n.id === id)[0];

		if (!note) {
			throw new Error(`Note with ID of ${id} could not be found!`);
		}

		return note;
	}

	public editNoteByID(id: string, request: Request) {
		const { title, body, tag } = request.payload as Note;

		const noteIndex = this.notes.findIndex(note => note.id === id);

		if (noteIndex === -1)
			throw new Error('Edit note failed. Note ID could not be found');

		const updatedAt = new Date();

		this.notes[noteIndex] = {
			...this.notes[noteIndex],
			title,
			body,
			tag,
			updatedAt,
		};
	}

	public deleteNoteByID(id: string) {
		const noteIndex = this.notes.findIndex(note => note.id === id);

		if (noteIndex === -1)
			throw new Error('Failed to delete note. Note ID could not be found');

		this.notes.splice(noteIndex, 1);
	}
}

export default NotesService;
