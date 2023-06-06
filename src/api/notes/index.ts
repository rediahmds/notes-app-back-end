import { Server } from 'hapi';
import { NotesService } from '../../services/inMemory/NotesService';
import NotesHandler from './handlers';
import routes from './routes';

const notesPlugin = {
	name: 'notes',
	version: '1.0.0',
	register: async (server: Server, options: { service: NotesService }) => {
		const { service } = options;
		const notesHandler = new NotesHandler(service);
		server.route(routes(notesHandler));
	},
};

export default notesPlugin;
