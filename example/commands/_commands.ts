import { ApplicationCommandOptionType } from 'discord.js';

/**
 * 👇 when using the library, change the import paths to 'discordjs-typed-commands'
 * 
 * import type { ReadonlyCommandList, TypedCommandList } from 'discordjs-typed-commands';
 * import { typed } from 'discordjs-typed-commands';
 */
import type { ReadonlyCommandList, TypedCommandList } from '../../src/index.js';
import { typed } from '../../src/index.js';

export const commands = [
    {
        name: 'greet',
        description: 'Greet a user.',
        options: [
            {
                name: 'user',
                type: ApplicationCommandOptionType.User,
                description: 'Which user to greet?',
                required: true
            }
        ]
    },
    {
        name: 'play',
        description: 'Play a game.',
        options: [
            {
                name: 'coin-toss',
                type: ApplicationCommandOptionType.Subcommand,
                description: 'Play a game of coin toss',
                options: [
                    {
                        name: 'coin',
                        type: ApplicationCommandOptionType.String,
                        description: 'Please select your choice',
                        required: true,
                        choices: [
                            { name: 'heads', value: 'heads' },
                            { name: 'tails', value: 'tails' },
                        ]
                    }
                ]
            },
            {
                name: 'rock-paper-scissors',
                type: ApplicationCommandOptionType.Subcommand,
                description: 'Play a game of rock-paper-scissors.',
                options: [
                    {
                        name: 'hand',
                        type: ApplicationCommandOptionType.String,
                        description: 'Please select your choice',
                        required: true,
                        choices: [
                            { name: 'rock', value: 'rock' },
                            { name: 'paper', value: 'paper' },
                            { name: 'scissors', value: 'scissors' },
                        ]
                    }
                ]
            },

        ]
    }
] as const satisfies ReadonlyCommandList;

export const isTyped = typed(commands);
export type Commands = TypedCommandList<typeof commands>;