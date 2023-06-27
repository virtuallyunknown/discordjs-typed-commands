import { ApplicationCommandOptionType } from 'discord.js';
import type { TypedAutocompleteList, ReadonlyCommandList, BaseCommand, CommandOptionAnyData, BaseCommandList, Expand, CommandOptionBasicData } from '../src/index.js';
import { typed } from '../src/index.js';

export const commands = [
    {
        name: '0-failsafe',
        description: 'failsafe type for test purposes',
        options: [
            { name: 'failsafe-subcommand', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true }
        ]
    },
    {
        name: '1-no-options',
        description: 'command with no options',
    },
    {
        name: '2-empty-options',
        description: 'command with empty options property value',
        options: [],
    },
    {
        name: '3-no-autocomplete',
        description: 'command with no autocomplete options',
        options: [
            { name: '4-string-req', type: ApplicationCommandOptionType.String, description: 'type-3' },
        ]
    },
    {
        name: '4-basic-options',
        description: 'command with all possible basic options',
        options: [
            { name: '4-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
            { name: '4-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', autocomplete: true },
            { name: '4-number', type: ApplicationCommandOptionType.Number, description: 'type-10', autocomplete: true },
        ],
    },
    {
        name: '5-basic-options-mixed',
        description: 'command with all possible basic options',
        options: [
            { name: '5-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
            { name: '5-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', autocomplete: false },
            { name: '5-number', type: ApplicationCommandOptionType.Number, description: 'type-10' },
            { name: '5-boolean', type: ApplicationCommandOptionType.Boolean, description: 'type-5' },
            { name: '5-user', type: ApplicationCommandOptionType.User, description: 'type-6' }
        ],
    },
    {
        name: '6-subcommand',
        description: 'command with a subcommand with basic options',
        options: [
            {
                name: '6-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-2', options: [
                    { name: '6-sub-1-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                    { name: '6-sub-1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', autocomplete: false },
                    { name: '6-sub-1-number', type: ApplicationCommandOptionType.Number, description: 'type-10' },
                ],
            },
            {
                name: '6-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-2', options: [
                    { name: '6-sub-2-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                    { name: '6-sub-2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', autocomplete: true },
                    { name: '6-sub-2-number', type: ApplicationCommandOptionType.Number, description: 'type-10' },
                ],
            },
            {
                name: '6-subcommand-3-no-auto', type: ApplicationCommandOptionType.Subcommand, description: 'type-2', options: [
                    { name: '6-sub-3-number', type: ApplicationCommandOptionType.Number, description: 'type-10' },
                ],
            },
            {
                name: '6-subcommand-4-empty', type: ApplicationCommandOptionType.Subcommand, description: 'type-2', options: [],
            }
        ]
    },
    {
        name: '7-subgroup',
        description: 'command with subcommand groups with subcommands with basic options',
        options: [
            {
                name: '7-subgroup-1', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    {
                        name: '7-subgroup-1-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '7-s1-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                            { name: '7-s1-s1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
                        ]
                    },
                    {
                        name: '7-subgroup-1-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '7-s1-s2-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                            { name: '7-s1-s2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
                        ]
                    }
                ]
            },
            {
                name: '7-subgroup-2', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    {
                        name: '7-subgroup-2-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '7-s2-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                            { name: '7-s2-s1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
                        ]
                    },
                    {
                        name: '7-subgroup-2-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '7-s2-s2-string', type: ApplicationCommandOptionType.String, description: 'type-3' },
                            { name: '7-s2-s2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
                        ]
                    }
                ]
            },
            {
                name: '7-subgroup-3-no-auto-subcommand', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-1', options: [
                    {
                        name: '7-subgroup-3-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-2', options: [
                            { name: '7-s3-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3' }
                        ]
                    }
                ]
            },
            {
                name: '7-subgroup-4-empty-subcommand', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    { name: '7-subgroup-4-empty-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' },
                    { name: '7-subgroup-4-empty-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' },
                ]
            },
        ]
    },
    {
        name: '8-subgroup-subcommand-sibling',
        description: 'command with subcommand groups and subcommands as siblings',
        options: [
            {
                name: '8-subgroup-1', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    {
                        name: '8-subgroup-1-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '8-s1-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                            { name: '8-s1-s1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
                        ]
                    },
                    {
                        name: '8-subgroup-1-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '8-s1-s2-string', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                            { name: '8-s1-s2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
                        ]
                    }
                ]
            },
            {
                name: '8-subcommand-sibling', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                    { name: '8-sib-str', type: ApplicationCommandOptionType.String, description: 'type-3', autocomplete: true },
                    { name: '8-sib-int', type: ApplicationCommandOptionType.Integer, description: 'type-3', autocomplete: true },
                ]
            },
            {
                name: '8-subcommand-sibling-empty', type: ApplicationCommandOptionType.Subcommand, description: 'type-1'
            }
        ]
    },
] as const satisfies ReadonlyCommandList;

export const isTyped = typed(commands);
export type Command = TypedAutocompleteList<typeof commands>;
