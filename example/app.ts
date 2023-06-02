import { Client, Events, GatewayIntentBits } from 'discord.js';
import { commands, isTyped, greetHandler, playHandler } from './commands/index.js';
import { updateCommands } from './util/update-commands.js';

const CREDENTIALS = {
    token: '...your token here...',
    clientId: '...your client id here...',
    serverId: '...your server id here...'
} as const;

const discord = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

await discord.login(CREDENTIALS.token);

discord.once(Events.ClientReady, async client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // 👇 uncomment this line to update your commands.
    // await updateCommands(commands, CREDENTIALS);
});

discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'greet')) {
        await greetHandler(interaction);
    }
    else if (isTyped.command(interaction, 'play')) {
        await playHandler(interaction);
    }
});

discord.on(Events.Debug, (msg) =>
    console.log(msg)
);

discord.on(Events.Warn, (msg) =>
    console.log(msg)
);
