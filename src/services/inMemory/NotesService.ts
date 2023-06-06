import { nanoid } from 'nanoid';

// TODO: Fix the approach of implementing optional properties
// Cuz: At some point those optional props are EXTREMELY necessary, it's the main structure.
// Suggestion: Create a class or another interface to make Optional<Note> only when adding new note
interface Note {
	id: string;
	title: string;
	body: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

class NotesService {
	private notes: Note[];
	constructor() {
		this.notes = [];
	}

	/**
	 *
	 * @param request request object. Just pass it. It'll be handled correctly
	 * @returns note id if success. Otherwise, return error message
	 */
	public addNote(requestPayload: {
		title: string;
		body: string;
		tags: string[];
	}) {
		const { title = 'untitled', body, tags } = requestPayload;
		const id = nanoid(8);

		const createdAt = new Date();
		const updatedAt = createdAt;

		const newNote: Note = {
			id,
			title,
			body,
			tags,
			createdAt,
			updatedAt,
		};

		this.notes.push(newNote);

		const isNoteAdded = this.notes.filter(note => note.id === id).length > 0;

		if (!isNoteAdded) throw new Error('Catatan gagal ditambahkan');

		return id;
	}

	public getNotes() {
		return this.notes;
	}

	public getNoteByID(id: string) {
		const note = this.notes.filter(n => n.id === id)[0];

		if (!note) {
			throw new Error(`Catatan tidak ditemukan`);
		}

		return note;
	}

	public editNoteByID(
		id: string,
		requestPayload: { title: string; body: string; tags: string[] }
	) {
		const { title, body, tags } = requestPayload;

		const noteIndex = this.notes.findIndex(note => note.id === id);

		if (noteIndex === -1)
			throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');

		const updatedAt = new Date();

		this.notes[noteIndex] = {
			...this.notes[noteIndex],
			title,
			body,
			tags,
			updatedAt,
		};
	}

	public deleteNoteByID(id: string) {
		const noteIndex = this.notes.findIndex(note => note.id === id);

		if (noteIndex === -1)
			throw new Error('Catatan gagal dihapus. Id tidak ditemukan');

		this.notes.splice(noteIndex, 1);
	}
}

export { Note, NotesService };
