import { NotesService, Note } from '../../services/inMemory/NotesService';
import { Request, ResponseObject, ResponseToolkit } from 'hapi';

// ONLY Handle requests, NOT handle CRUD directly.
// In short, ONLY handle req, res cycle
class NotesHandler {
	private service: NotesService;
	constructor(service: NotesService) {
		this.service = service;

		this.postNoteHandler = this.postNoteHandler.bind(this);
		this.getNotesHandler = this.getNotesHandler.bind(this);
		this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
		this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
		this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
	}

	public postNoteHandler(request: Request, h: ResponseToolkit) {
		try {
			const requestPayload = request.payload as {
				title: string;
				body: string;
				tags: string[];
			};
			const noteID: string = this.service.addNote(requestPayload);
			const response: ResponseObject = h
				.response({
					status: 'success',
					message: 'Catatan berhasil ditambahkan',
					data: {
						noteID,
					},
				})
				.code(201);

			return response;
		} catch (error) {
			if (error instanceof Error) {
				const response: ResponseObject = h
					.response({
						status: 'fail',
						message: error.message,
					})
					.code(400);

				return response;
			}
		}
	}

	public getNotesHandler() {
		const notes: Note[] = this.service.getNotes();

		return {
			status: 'success',
			data: {
				notes,
			},
		};
	}

	public getNoteByIdHandler(request: Request, h: ResponseToolkit) {
		try {
			const { id } = request.params as { id: string };

			const note: Note = this.service.getNoteByID(id);
			const response: ResponseObject = h.response({
				status: 'success',
				data: {
					note,
				},
			});

			return response;
		} catch (error) {
			if (error instanceof Error) {
				const response: ResponseObject = h.response({
					status: 'fail',
					message: error.message,
				});
				response.code(404);
				return response;
			}
		}
	}
	public putNoteByIdHandler(request: Request, h: ResponseToolkit) {
		try {
			const { id } = request.params as { id: string };
			const requestPayload = request.payload as {
				title: string;
				body: string;
				tags: string[];
			};
			this.service.editNoteByID(id, requestPayload);
			return {
				status: 'success',
				message: 'Catatan berhasil diperbarui',
			};
		} catch (error) {
			if (error instanceof Error) {
				const response = h
					.response({
						status: 'fail',
						message: error.message,
					})
					.code(404);
				return response;
			}
		}
	}
	public deleteNoteByIdHandler(request: Request, h: ResponseToolkit) {
		try {
			const { id } = request.payload as { id: string };
			this.service.deleteNoteByID(id);

			return {
				status: 'success',
				message: 'Catatan berhasil dihapus',
			};
		} catch (error) {
			if (error instanceof Error) {
				const response = h
					.response({
						status: 'fail',
						message: error.message,
					})
					.code(404);
				return response;
			}
		}
	}
}

export default NotesHandler;
