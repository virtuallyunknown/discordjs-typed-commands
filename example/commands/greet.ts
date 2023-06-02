import type { Commands } from './index.js';

export async function greetHandler(interaction: Commands['greet']) {
    await interaction.reply({
        content: `Greetings ${interaction.options.get('user').user.username}!`
    });
}