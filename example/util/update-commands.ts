import { REST, Routes } from 'discord.js';
import type { ReadonlyCommandList } from '../../src/index.js';

export async function updateCommands(commands: ReadonlyCommandList, credentials: { token: string, clientId: string, serverId: string }) {
    try {
        const rest = new REST({ version: '10' }).setToken(credentials.token);
        await rest.put(
            Routes.applicationGuildCommands(
                credentials.clientId,
                credentials.serverId,
            ),
            { body: commands },
        );

        console.log(`Updated the following ${commands.length} commands: ${commands.map(c => c.name).join(', ')}`);
    } catch (error) {
        console.error(error);
    }
}
