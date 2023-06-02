import { ApplicationCommandOptionType } from 'discord.js';
import type { TypedCommandList, ReadonlyCommandList } from '../src/index.js';
import { typed } from '../src/index.js';

export const commands = [
    {
        name: '0-failsafe',
        description: 'failsafe type for test purposes',
        options: [
            { name: 'failsafe-subcommand', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' }
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
        name: '3-basic-options',
        description: 'command with all possible basic options',
        options: [
            { name: '3-string', type: ApplicationCommandOptionType.String, description: 'type-3' },
            { name: '3-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4' },
            { name: '3-boolean', type: ApplicationCommandOptionType.Boolean, description: 'type-5' },
            { name: '3-user', type: ApplicationCommandOptionType.User, description: 'type-6' },
            { name: '3-channel', type: ApplicationCommandOptionType.Channel, description: 'type-7' },
            { name: '3-role', type: ApplicationCommandOptionType.Role, description: 'type-8' },
            { name: '3-mentionable', type: ApplicationCommandOptionType.Mentionable, description: 'type-9' },
            { name: '3-number', type: ApplicationCommandOptionType.Number, description: 'type-10' },
            { name: '3-attachment', type: ApplicationCommandOptionType.Attachment, description: 'type-11' },
        ],
    },
    {
        name: '4-basic-options-require',
        description: 'command with required types',
        options: [
            { name: '4-string-req', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
            { name: '4-string-unreq', type: ApplicationCommandOptionType.String, description: 'type-3', required: false },
            { name: '4-string-undef', type: ApplicationCommandOptionType.String, description: 'type-3' },
        ],
    },
    {
        name: '5-basic-options-choices',
        description: 'command with choice types',
        options: [
            {
                name: '5-string-req', type: ApplicationCommandOptionType.String, description: 'type-3', required: true, choices: [
                    { name: '5-string-choice-1', value: '5-string-choice-1-value' },
                    { name: '5-string-choice-2', value: '5-string-choice-2-value' },
                ]
            },
            {
                name: '5-integer-req', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true, choices: [
                    { name: '5-integer-choice-1', value: 511 },
                    { name: '5-integer-choice-2', value: 512 },
                ]
            },
            {
                name: '5-number-req', type: ApplicationCommandOptionType.Number, description: 'type-10', required: true, choices: [
                    { name: '5-number-choice-1', value: 521 },
                    { name: '5-number-choice-2', value: 522 },
                ]
            },
            {
                name: '5-string', type: ApplicationCommandOptionType.String, description: 'type-3', choices: [
                    { name: '5-string-choice-1', value: '5-string-choice-1-value' },
                    { name: '5-string-choice-2', value: '5-string-choice-2-value' },
                ]
            },
            {
                name: '5-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', choices: [
                    { name: '5-integer-choice-1', value: 531 },
                    { name: '5-integer-choice-2', value: 532 },
                ]
            },
            {
                name: '5-number', type: ApplicationCommandOptionType.Number, description: 'type-10', choices: [
                    { name: '5-number-choice-1', value: 541 },
                    { name: '5-number-choice-2', value: 542 },
                ]
            },
        ],
    },
    {
        name: '6-subcommand-empty-options',
        description: 'command with a subcommand with no options',
        options: [
            { name: '6-subcommand', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' }
        ]
    },
    {
        name: '7-subcommand-basic-options',
        description: 'command with a subcommand with basic option types',
        options: [
            {
                name: '7-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1',
                options: [
                    { name: '7-sub-1-string', description: 'type-3', type: ApplicationCommandOptionType.String, required: true },
                    { name: '7-sub-1-integer', description: 'type-4', type: ApplicationCommandOptionType.Integer, required: true },
                ]
            },
            {
                name: '7-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1',
                options: [
                    { name: '7-sub-2-string', description: 'type-3', type: ApplicationCommandOptionType.String, required: true },
                    { name: '7-sub-2-boolean', description: 'type-5', type: ApplicationCommandOptionType.Boolean, required: true },
                ]
            },
            {
                name: '7-subcommand-3-empty', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                    // { name: '', type: ApplicationCommandOptionType.Boolean, description: '' }
                ]
            }
        ]
    },
    {
        name: '8-subgroup-empty-group',
        description: 'command with subcommand group with no options',
        options: [
            { name: 'subgroup', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [] }
        ]
    },
    {
        name: '9-subgroup-empty-subcommand',
        description: 'command with subcommand group with subcommand with no options',
        options: [
            {
                name: '9-subgroup', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    { name: '9-subcommand-empty', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' }
                ]
            }
        ]
    },
    {
        name: '10-subgroup',
        description: 'command with subcommand groups with subcommands with basic options',
        options: [
            {
                name: '10-subgroup-1', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    {
                        name: '10-subgroup-1-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '10-s1-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
                            { name: '10-s1-s1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true },
                        ]
                    },
                    {
                        name: '10-subgroup-1-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '10-s1-s2-string', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
                            { name: '10-s1-s2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true },
                        ]
                    }
                ]
            },
            {
                name: '10-subgroup-2', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    {
                        name: '10-subgroup-2-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '10-s2-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
                            { name: '10-s2-s1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true },
                        ]
                    },
                    {
                        name: '10-subgroup-2-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '10-s2-s2-string', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
                            { name: '10-s2-s2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true },
                        ]
                    }
                ]
            },
            {
                name: '10-subgroup-3-empty', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: []
            },
            {
                name: '10-subgroup-4-empty-subcommand', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    { name: '10-subgroup-4-empty-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' },
                    { name: '10-subgroup-4-empty-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1' },
                ]
            },
        ]
    },
    {
        name: '11-subgroup-subcommand-sibling',
        description: 'command with subcommand groups and subcommands as siblings',
        options: [
            {
                name: '11-subgroup-1', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: [
                    {
                        name: '11-sugroup-1-subcommand-1', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '11-s1-s1-string', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
                            { name: '11-s1-s1-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true },
                        ]
                    },
                    {
                        name: '11-sugroup-1-subcommand-2', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                            { name: '11-s1-s2-string', type: ApplicationCommandOptionType.String, description: 'type-3', required: true },
                            { name: '11-s1-s2-integer', type: ApplicationCommandOptionType.Integer, description: 'type-4', required: true },
                        ]
                    },
                    { name: '11-sugroup-1-subcommand-3-empty', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [] },
                ]
            },
            {
                name: '11-subgroup-2-empty', type: ApplicationCommandOptionType.SubcommandGroup, description: 'type-2', options: []
            },
            {
                name: '11-subcommand-sibling', type: ApplicationCommandOptionType.Subcommand, description: 'type-1', options: [
                    { name: '11-sib-str', type: ApplicationCommandOptionType.String, description: 'type-3' },
                    { name: '11-sib-int', type: ApplicationCommandOptionType.Integer, description: 'type-3' },
                ]
            },
            {
                name: '11-subcommand-sibling-empty', type: ApplicationCommandOptionType.Subcommand, description: 'type-1'
            }
        ]
    },
] as const satisfies ReadonlyCommandList;

export const isTyped = typed(commands);
export type Command = TypedCommandList<typeof commands>;
