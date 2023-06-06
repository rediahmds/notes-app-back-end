import { Server } from 'hapi';
import { NotesService } from './services/inMemory/NotesService';
import notesPlugin from './api/notes';

const initServer = async () => {
	const notesService = new NotesService();
	const server = new Server({
		port: 5000,
		host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});

	await server.register({
		plugin: notesPlugin,
		options: { service: notesService },
	});

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

initServer();
