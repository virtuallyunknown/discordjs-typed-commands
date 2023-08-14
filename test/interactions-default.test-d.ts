/* eslint-disable @typescript-eslint/no-floating-promises */
import { test } from 'node:test';
import { expectTypeOf } from 'expect-type';
import type { Interaction, ApplicationCommandOptionType, CommandInteractionOption } from 'discord.js';
import type { TypedSubcommand } from '../src/index.js';
import type { Command, commands } from './commands-default.test-d.js';
import { isTyped } from './commands-default.test-d.js';

type Optional<T> = T | undefined;
type FailsafeFunction = (command: Command['0-failsafe']) => void;

declare const interaction: Interaction;

/**
 * Notes:
 * Can not use `not` with `toBeCallableWith`.
 * @see https://github.com/mmkal/expect-type/issues/6
 */

test('0-failsafe', () => {
    if (isTyped.command(interaction, '0-failsafe')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['0-failsafe']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'0-failsafe'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }

    function commandFunc(interaction: Command['0-failsafe']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['0-failsafe']>();
    }
});

test('1-no-options', () => {
    if (isTyped.command(interaction, '1-no-options')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['1-no-options']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'1-no-options'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }

    function commandFunc(interaction: Command['1-no-options']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['1-no-options']>();
    }
});

test('2-empty-options', () => {
    if (isTyped.command(interaction, '2-empty-options')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['2-empty-options']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'2-empty-options'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }

    function commandFunc(interaction: Command['2-empty-options']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['2-empty-options']>();
    }
});

test('3-basic-options', () => {
    if (isTyped.command(interaction, '3-basic-options')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['3-basic-options']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'3-basic-options'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is not never */
        expectTypeOf(interaction.options.get('3-attachment')?.name).toEqualTypeOf<Optional<'3-attachment'>>();
    }

    function commandFunc(interaction: Command['3-basic-options']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['3-basic-options']>();

        /** interaction options types work correctly */
        const options = {
            attachment: interaction.options.get('3-attachment'),
            boolean: interaction.options.get('3-boolean'),
            channel: interaction.options.get('3-channel'),
            integer: interaction.options.get('3-integer'),
            mentionable: interaction.options.get('3-mentionable'),
            number: interaction.options.get('3-number'),
            role: interaction.options.get('3-role'),
            string: interaction.options.get('3-string'),
            user: interaction.options.get('3-user'),
        };

        expectTypeOf(options.attachment?.name).toEqualTypeOf<Optional<'3-attachment'>>();
        expectTypeOf(options.attachment?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Attachment>>();
        expectTypeOf(options.attachment?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.attachment?.attachment).toEqualTypeOf<CommandInteractionOption['attachment']>();

        expectTypeOf(options.boolean?.name).toEqualTypeOf<Optional<'3-boolean'>>();
        expectTypeOf(options.boolean?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Boolean>>();
        expectTypeOf(options.boolean?.value).toEqualTypeOf<Optional<boolean>>();

        expectTypeOf(options.channel?.name).toEqualTypeOf<Optional<'3-channel'>>();
        expectTypeOf(options.channel?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Channel>>();
        expectTypeOf(options.channel?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.channel?.channel).toEqualTypeOf<CommandInteractionOption['channel']>();

        expectTypeOf(options.integer?.name).toEqualTypeOf<Optional<'3-integer'>>();
        expectTypeOf(options.integer?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Integer>>();
        expectTypeOf(options.integer?.value).toEqualTypeOf<Optional<number>>();

        expectTypeOf(options.mentionable?.name).toEqualTypeOf<Optional<'3-mentionable'>>();
        expectTypeOf(options.mentionable?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Mentionable>>();
        expectTypeOf(options.mentionable?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.mentionable?.member).toEqualTypeOf<Optional<CommandInteractionOption['member']>>();
        expectTypeOf(options.mentionable?.role).toEqualTypeOf<Optional<CommandInteractionOption['role']>>();
        expectTypeOf(options.mentionable?.user).toEqualTypeOf<Optional<CommandInteractionOption['user']>>();

        expectTypeOf(options.number?.name).toEqualTypeOf<Optional<'3-number'>>();
        expectTypeOf(options.number?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Number>>();
        expectTypeOf(options.number?.value).toEqualTypeOf<Optional<number>>();

        expectTypeOf(options.role?.name).toEqualTypeOf<Optional<'3-role'>>();
        expectTypeOf(options.role?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Role>>();
        expectTypeOf(options.role?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.role?.role).toEqualTypeOf<Optional<CommandInteractionOption['role']>>();

        expectTypeOf(options.string?.name).toEqualTypeOf<Optional<'3-string'>>();
        expectTypeOf(options.string?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.String>>();
        expectTypeOf(options.string?.value).toEqualTypeOf<Optional<string>>();

        expectTypeOf(options.user?.name).toEqualTypeOf<Optional<'3-user'>>();
        expectTypeOf(options.user?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.User>>();
        expectTypeOf(options.user?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.user?.user).toEqualTypeOf<Optional<CommandInteractionOption['user']>>();
    }
});

test('4-basic-options-require', () => {
    if (isTyped.command(interaction, '4-basic-options-require')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['4-basic-options-require']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'4-basic-options-require'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is not never */
        expectTypeOf(interaction.options.get('4-string-req').name).toEqualTypeOf<'4-string-req'>();

    }

    function commandFunc(interaction: Command['4-basic-options-require']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['4-basic-options-require']>();

        /** interaction options types work correctly */
        const options = {
            req: interaction.options.get('4-string-req'),
            undef: interaction.options.get('4-string-undef'),
            unreq: interaction.options.get('4-string-unreq'),
        };

        expectTypeOf(options.req.name).toEqualTypeOf<'4-string-req'>();
        expectTypeOf(options.req.type).toEqualTypeOf<ApplicationCommandOptionType.String>();
        expectTypeOf(options.req.value).toEqualTypeOf<string>();

        expectTypeOf(options.undef?.name).toEqualTypeOf<Optional<'4-string-undef'>>();
        expectTypeOf(options.undef?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.String>>();
        expectTypeOf(options.undef?.value).toEqualTypeOf<Optional<string>>();

        expectTypeOf(options.unreq?.name).toEqualTypeOf<Optional<'4-string-unreq'>>();
        expectTypeOf(options.unreq?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.String>>();
        expectTypeOf(options.unreq?.value).toEqualTypeOf<Optional<string>>();
    }
});

test('5-basic-options-choices', () => {
    if (isTyped.command(interaction, '5-basic-options-choices')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['5-basic-options-choices']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'5-basic-options-choices'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is not never */
        expectTypeOf(interaction.options.get('5-integer')?.name).toEqualTypeOf<Optional<'5-integer'>>();
    }

    function commandFunc(interaction: Command['5-basic-options-choices']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['5-basic-options-choices']>();

        /** interaction options types work correctly */
        const options = {
            integer: interaction.options.get('5-integer'),
            integerReq: interaction.options.get('5-integer-req'),
            number: interaction.options.get('5-number'),
            numberReq: interaction.options.get('5-number-req'),
            string: interaction.options.get('5-string'),
            stringReq: interaction.options.get('5-string-req'),
        };

        expectTypeOf(options.integer?.name).toEqualTypeOf<Optional<'5-integer'>>();
        expectTypeOf(options.integer?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Integer>>();
        expectTypeOf(options.integer?.value).toEqualTypeOf<Optional<531 | 532>>();

        expectTypeOf(options.integerReq.name).toEqualTypeOf<'5-integer-req'>();
        expectTypeOf(options.integerReq.type).toEqualTypeOf<ApplicationCommandOptionType.Integer>();
        expectTypeOf(options.integerReq.value).toEqualTypeOf<511 | 512>();

        expectTypeOf(options.number?.name).toEqualTypeOf<Optional<'5-number'>>();
        expectTypeOf(options.number?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Number>>();
        expectTypeOf(options.number?.value).toEqualTypeOf<Optional<541 | 542>>();

        expectTypeOf(options.numberReq.name).toEqualTypeOf<'5-number-req'>();
        expectTypeOf(options.numberReq.type).toEqualTypeOf<ApplicationCommandOptionType.Number>();
        expectTypeOf(options.numberReq.value).toEqualTypeOf<521 | 522>();

        expectTypeOf(options.string?.name).toEqualTypeOf<Optional<'5-string'>>();
        expectTypeOf(options.string?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.String>>();
        expectTypeOf(options.string?.value).toEqualTypeOf<Optional<'5-string-choice-1-value' | '5-string-choice-2-value'>>();

        expectTypeOf(options.stringReq.name).toEqualTypeOf<'5-string-req'>();
        expectTypeOf(options.stringReq.type).toEqualTypeOf<ApplicationCommandOptionType.String>();
        expectTypeOf(options.stringReq.value).toEqualTypeOf<'5-string-choice-1-value' | '5-string-choice-2-value'>();
    }
});

test('6-subcommand-empty-options', () => {
    if (isTyped.command(interaction, '6-subcommand-empty-options')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['6-subcommand-empty-options']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'6-subcommand-empty-options'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();

        if (isTyped.subcommand(interaction, '6-subcommand')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '6-subcommand-empty-options', '6-subcommand'>>();
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
        }
    }

    function commandFunc(interaction: Command['6-subcommand-empty-options']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['6-subcommand-empty-options']>();

        if (isTyped.subcommand(interaction, '6-subcommand')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '6-subcommand-empty-options', '6-subcommand'>>();
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
        }
    }
});

test('7-subcommand-basic-options', () => {
    if (isTyped.command(interaction, '7-subcommand-basic-options')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['7-subcommand-basic-options']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'7-subcommand-basic-options'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();

        /** interaction.options.getSubcommand() narrows down properly */
        if (
            isTyped.subcommand(interaction, '7-subcommand-1') ||
            isTyped.subcommand(interaction, '7-subcommand-2') ||
            isTyped.subcommand(interaction, '7-subcommand-3-empty')
        ) {
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'7-subcommand-1' | '7-subcommand-2' | '7-subcommand-3-empty'>();
        }

        if (isTyped.subcommand(interaction, '7-subcommand-1')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '7-subcommand-basic-options', '7-subcommand-1'>>();
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.get is not never */
            expectTypeOf(interaction.options.get('7-sub-1-string').name).toEqualTypeOf<'7-sub-1-string'>();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'7-subcommand-1'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('7-sub-2-string');
        }

        if (isTyped.subcommand(interaction, '7-subcommand-2')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '7-subcommand-basic-options', '7-subcommand-2'>>();
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.get is not never */
            expectTypeOf(interaction.options.get('7-sub-2-string').name).toEqualTypeOf<'7-sub-2-string'>();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'7-subcommand-2'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('7-sub-1-string');
        }

        if (isTyped.subcommand(interaction, '7-subcommand-3-empty')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '7-subcommand-basic-options', '7-subcommand-3-empty'>>();
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'7-subcommand-3-empty'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('7-sub-1-string');
        }
    }

    function commandFunc(interaction: Command['7-subcommand-basic-options']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['7-subcommand-basic-options']>();

        if (isTyped.subcommand(interaction, '7-subcommand-1')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '7-subcommand-basic-options', '7-subcommand-1'>>();
        }
        if (isTyped.subcommand(interaction, '7-subcommand-2')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '7-subcommand-basic-options', '7-subcommand-2'>>();
        }
        if (isTyped.subcommand(interaction, '7-subcommand-3-empty')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '7-subcommand-basic-options', '7-subcommand-3-empty'>>();
        }

    }
});

test('8-subgroup-empty-group', () => {
    if (isTyped.command(interaction, '8-subgroup-empty-group')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['8-subgroup-empty-group']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'8-subgroup-empty-group'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }

    function commandFunc(interaction: Command['8-subgroup-empty-group']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['8-subgroup-empty-group']>();
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }
});

test('9-subgroup-empty-subcommand', () => {
    if (isTyped.command(interaction, '9-subgroup-empty-subcommand')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['9-subgroup-empty-subcommand']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'9-subgroup-empty-subcommand'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();

        if (isTyped.subcommand(interaction, '9-subcommand-empty')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '9-subgroup-empty-subcommand', '9-subcommand-empty'>>();
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
        }
    }

    function commandFunc(interaction: Command['9-subgroup-empty-subcommand']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['9-subgroup-empty-subcommand']>();
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
        if (isTyped.subcommand(interaction, '9-subcommand-empty')) {
            /** interaction matches subcommand */
            expectTypeOf(interaction).toEqualTypeOf<TypedSubcommand<typeof commands, '9-subgroup-empty-subcommand', '9-subcommand-empty'>>();
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
        }
    }
});

test('10-subgroup', () => {
    if (isTyped.command(interaction, '10-subgroup')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['10-subgroup']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'10-subgroup'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }

    function commandFunc(interaction: Command['10-subgroup']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['10-subgroup']>();
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();

        if (
            isTyped.subcommand(interaction, '10-subgroup-1-subcommand-1') ||
            isTyped.subcommand(interaction, '10-subgroup-1-subcommand-2') ||
            isTyped.subcommand(interaction, '10-subgroup-2-subcommand-1') ||
            isTyped.subcommand(interaction, '10-subgroup-2-subcommand-2') ||
            isTyped.subcommand(interaction, '10-subgroup-4-empty-subcommand-1') ||
            isTyped.subcommand(interaction, '10-subgroup-4-empty-subcommand-2')
        ) {
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-1-subcommand-1' | '10-subgroup-1-subcommand-2' | '10-subgroup-2-subcommand-1' | '10-subgroup-2-subcommand-2' | '10-subgroup-4-empty-subcommand-1' | '10-subgroup-4-empty-subcommand-2'>();
        }

        if (isTyped.subcommand(interaction, '10-subgroup-1-subcommand-1')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-1-subcommand-1'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('10-s2-s2-integer');
        }

        if (isTyped.subcommand(interaction, '10-subgroup-1-subcommand-2')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-1-subcommand-2'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('10-s1-s1-integer');
        }

        if (isTyped.subcommand(interaction, '10-subgroup-2-subcommand-1')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-2-subcommand-1'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('10-s1-s1-integer');
        }

        if (isTyped.subcommand(interaction, '10-subgroup-2-subcommand-2')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-2-subcommand-2'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('10-s1-s1-integer');
        }

        if (isTyped.subcommand(interaction, '10-subgroup-4-empty-subcommand-1')) {
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-4-empty-subcommand-1'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('10-s1-s1-integer');
        }

        if (isTyped.subcommand(interaction, '10-subgroup-4-empty-subcommand-2')) {
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'10-subgroup-4-empty-subcommand-2'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('10-s1-s1-integer');
        }
    }
});

test('11-subgroup-subcommand-sibling', () => {
    if (isTyped.command(interaction, '11-subgroup-subcommand-sibling')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['11-subgroup-subcommand-sibling']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'11-subgroup-subcommand-sibling'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.get is never */
        expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
    }

    function commandFunc(interaction: Command['11-subgroup-subcommand-sibling']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['11-subgroup-subcommand-sibling']>();

        if (
            isTyped.subcommand(interaction, '11-subcommand-sibling') ||
            isTyped.subcommand(interaction, '11-subcommand-sibling-empty') ||
            isTyped.subcommand(interaction, '11-sugroup-1-subcommand-1') ||
            isTyped.subcommand(interaction, '11-sugroup-1-subcommand-2') ||
            isTyped.subcommand(interaction, '11-sugroup-1-subcommand-3-empty')
        ) {
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'11-sugroup-1-subcommand-1' | '11-sugroup-1-subcommand-2' | '11-sugroup-1-subcommand-3-empty' | '11-subcommand-sibling' | '11-subcommand-sibling-empty'>();
        }

        if (isTyped.subcommand(interaction, '11-sugroup-1-subcommand-1')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'11-sugroup-1-subcommand-1'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('11-s1-s2-integer');
        }
        if (isTyped.subcommand(interaction, '11-sugroup-1-subcommand-2')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'11-sugroup-1-subcommand-2'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('11-s1-s1-integer');
        }
        if (isTyped.subcommand(interaction, '11-sugroup-1-subcommand-3-empty')) {
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'11-sugroup-1-subcommand-3-empty'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('11-s1-s1-integer');
        }
        if (isTyped.subcommand(interaction, '11-subcommand-sibling')) {
            /** interaction.options.get is not never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().not.toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'11-subcommand-sibling'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('11-s1-s1-integer');
        }

        if (isTyped.subcommand(interaction, '11-subcommand-sibling-empty')) {
            /** interaction.options.get is never */
            expectTypeOf<Parameters<typeof interaction['options']['get']>[0]>().toBeNever();
            /** interaction.options.getSubcommand() narrows down properly */
            expectTypeOf(interaction.options.getSubcommand()).toEqualTypeOf<'11-subcommand-sibling-empty'>();
            /** interaction.options.get can't access sibling options */
            /** @ts-expect-error */
            interaction.options.get('11-s1-s1-integer');
        }
    }
});