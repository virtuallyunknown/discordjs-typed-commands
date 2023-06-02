import type { Commands } from './_commands.js';
import { isTyped } from './_commands.js';

export async function playHandler(interaction: Commands['play']) {
    if (isTyped.subcommand(interaction, 'coin-toss')) {
        const coin = interaction.options.get('coin');
        // { name: 'choice', type: 3, value: 'heads' | 'tails' }

        const result = ['heads', 'tails'][Math.floor(Math.random() * 2)];
        // 'heads' | 'tails'

        await interaction.reply({
            content: `Result is ${result}. You ${coin.value === result ? 'win' : 'lose'}.`
        });
    }

    else if (isTyped.subcommand(interaction, 'rock-paper-scissors')) {
        // ...
    }
}

