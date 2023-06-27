/* eslint-disable @typescript-eslint/no-floating-promises */
import { test } from 'node:test';
import { expectTypeOf } from 'expect-type';
import type { ApplicationCommand, ApplicationCommandOptionType, Interaction } from 'discord.js';
import type { TypedSubcommand, Expand } from '../src/index.js';
import type { Command, commands } from './commands-autocomplete.test-d.js';
import { isTyped } from './commands-autocomplete.test-d.js';

type Optional<T> = T | undefined;
type Nullable<T> = T | null;
type FailsafeFunction = (command: Command['0-failsafe']) => void;

declare const interaction: Interaction;

/**
 * Notes:
 * Can not use `not` with `toBeCallableWith`.
 * @see https://github.com/mmkal/expect-type/issues/6
 */

test('unreachable', () => {
    /** @ts-expect-error */
    if (isTyped.autocomplete(interaction, '1-no-options')) { }
    /** @ts-expect-error */
    if (isTyped.autocomplete(interaction, '2-empty-options')) { }
    /** @ts-expect-error */
    if (isTyped.autocomplete(interaction, '3-no-autocomplete')) { }
});

test('0-failsafe', () => {
    if (isTyped.autocomplete(interaction, '0-failsafe')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['0-failsafe']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'0-failsafe'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
    }

    function commandFunc(interaction: Command['0-failsafe']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['0-failsafe']>();
    }
});

test('4-basic-options', () => {
    if (isTyped.autocomplete(interaction, '4-basic-options')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['4-basic-options']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'4-basic-options'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.getFocused is not never */
        expectTypeOf(interaction.options.getFocused(true).focused).toEqualTypeOf<true>();
        /** interaction.options.get is not never */
        expectTypeOf(interaction.options.get('4-integer')?.name).toEqualTypeOf<Optional<'4-integer'>>();
    }

    function commandFunc(interaction: Command['4-basic-options']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['4-basic-options']>();

        /** interaction focused types work correctly */
        const focused = interaction.options.getFocused(true);

        expectTypeOf(focused.focused).toEqualTypeOf<true>();
        expectTypeOf(focused.name).toEqualTypeOf<'4-string' | '4-integer' | '4-number'>();
        expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.String | ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number>();
        expectTypeOf(focused.value).toEqualTypeOf<string>();

        if (focused.name === '4-integer') {
            expectTypeOf(focused.name).toEqualTypeOf<'4-integer'>();
            expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.Integer>();
            expectTypeOf(focused.value).toEqualTypeOf<string>();
        }
        if (focused.name === '4-number') {
            expectTypeOf(focused.name).toEqualTypeOf<'4-number'>();
            expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.Number>();
            expectTypeOf(focused.value).toEqualTypeOf<string>();
        }
        if (focused.name === '4-string') {
            expectTypeOf(focused.name).toEqualTypeOf<'4-string'>();
            expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.String>();
            expectTypeOf(focused.value).toEqualTypeOf<string>();
        }

        /** interaction options types work correctly */
        const options = {
            int: interaction.options.get('4-integer'),
            num: interaction.options.get('4-number'),
            str: interaction.options.get('4-string')
        };

        expectTypeOf(options.int).toMatchTypeOf<Nullable<{}>>();
        expectTypeOf(options.int?.focused).toEqualTypeOf<Optional<true>>();
        expectTypeOf(options.int?.name).toEqualTypeOf<Optional<'4-integer'>>();
        expectTypeOf(options.int?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Integer>>();
        expectTypeOf(options.int?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.num).toMatchTypeOf<Nullable<{}>>();
        expectTypeOf(options.num?.focused).toEqualTypeOf<Optional<true>>();
        expectTypeOf(options.num?.name).toEqualTypeOf<Optional<'4-number'>>();
        expectTypeOf(options.num?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Number>>();
        expectTypeOf(options.num?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.str).toMatchTypeOf<Nullable<{}>>();
        expectTypeOf(options.str?.focused).toEqualTypeOf<Optional<true>>();
        expectTypeOf(options.str?.name).toEqualTypeOf<Optional<'4-string'>>();
        expectTypeOf(options.str?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.String>>();
        expectTypeOf(options.str?.value).toEqualTypeOf<Optional<string>>();
    }
});

test('5-basic-options-mixed', () => {
    if (isTyped.autocomplete(interaction, '5-basic-options-mixed')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['5-basic-options-mixed']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'5-basic-options-mixed'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);
        /** interaction.options.getFocused is not never */
        expectTypeOf(interaction.options.getFocused(true).focused).toEqualTypeOf<true>();
        /** interaction.options.get is not never */
        expectTypeOf(interaction.options.get('5-string')?.name).toEqualTypeOf<Optional<'5-string'>>();
    }

    function commandFunc(interaction: Command['5-basic-options-mixed']) {
        const focused = interaction.options.getFocused(true);

        expectTypeOf(focused.focused).toEqualTypeOf<true>();
        expectTypeOf(focused.name).toEqualTypeOf<'5-string'>();
        expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.String>();
        expectTypeOf(focused.value).toEqualTypeOf<string>();

        const options = {
            bool: interaction.options.get('5-boolean'),
            int: interaction.options.get('5-integer'),
            num: interaction.options.get('5-number'),
            str: interaction.options.get('5-string'),
            user: interaction.options.get('5-user'),
        };

        expectTypeOf(options.bool?.name).toEqualTypeOf<Optional<'5-boolean'>>();
        expectTypeOf(options.bool?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Boolean>>();
        expectTypeOf(options.bool?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.int?.name).toEqualTypeOf<Optional<'5-integer'>>();
        expectTypeOf(options.int?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Integer>>();
        expectTypeOf(options.int?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.num?.name).toEqualTypeOf<Optional<'5-number'>>();
        expectTypeOf(options.num?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.Number>>();
        expectTypeOf(options.num?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.str?.name).toEqualTypeOf<Optional<'5-string'>>();
        expectTypeOf(options.str?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.String>>();
        expectTypeOf(options.str?.value).toEqualTypeOf<Optional<string>>();
        expectTypeOf(options.user?.name).toEqualTypeOf<Optional<'5-user'>>();
        expectTypeOf(options.user?.type).toEqualTypeOf<Optional<ApplicationCommandOptionType.User>>();
        expectTypeOf(options.user?.value).toEqualTypeOf<Optional<string>>();
    }
});

test('6-subcommand', () => {
    if (isTyped.autocomplete(interaction, '6-subcommand')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['6-subcommand']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'6-subcommand'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);

        /** interaction.options.getFocused is not callable */
        /** @ts-expect-error */
        interaction.options.getFocused(true);
        /** interaction.options.get('...') is not callable */
        /** @ts-expect-error */
        interaction.options.get('6-sub-1-integer');
    }

    function commandFunc(interaction: Command['6-subcommand']) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['6-subcommand']>();

        if (isTyped.autocompleteSubcommand(interaction, '6-subcommand-1')) {
            const focused = interaction.options.getFocused(true);

            expectTypeOf(focused.name).toEqualTypeOf<'6-sub-1-string'>();
            expectTypeOf(focused.focused).toEqualTypeOf<true>();
            expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.String>();
            expectTypeOf(focused.value).toEqualTypeOf<string>();

            /** @ts-expect-error */
            interaction.options.get('6-sub-2-integer');

        }

        if (isTyped.autocompleteSubcommand(interaction, '6-subcommand-2')) {
            const focused = interaction.options.getFocused(true);

            expectTypeOf(focused.name).toEqualTypeOf<'6-sub-2-string' | '6-sub-2-integer'>();
            expectTypeOf(focused.focused).toEqualTypeOf<true>();
            expectTypeOf(focused.type).toEqualTypeOf<ApplicationCommandOptionType.String | ApplicationCommandOptionType.Integer>();
            expectTypeOf(focused.value).toEqualTypeOf<string>();

            /** @ts-expect-error */
            interaction.options.get('6-sub-1-integer');
        }
    }
});

test('7-subgroup', () => {
    if (isTyped.autocomplete(interaction, '7-subgroup')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['7-subgroup']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'7-subgroup'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);

        /** interaction.options.getFocused is not callable */
        /** @ts-expect-error */
        interaction.options.getFocused(true);
        /** interaction.options.get('...') is not callable */
        /** @ts-expect-error */
        interaction.options.get('7-s1-s1-integer');
    }

    function commandFunc(interaction: Command['7-subgroup']) {

        if (isTyped.autocompleteSubcommand(interaction, '7-subgroup-1-subcommand-1')) {
            const focused = interaction.options.getFocused(true);

            expectTypeOf(focused.name).toEqualTypeOf<'7-s1-s1-string'>();

            /** @ts-expect-error */
            interaction.options.get('7-s2-s1-integer');
        }


        if (isTyped.autocompleteSubcommand(interaction, '7-subgroup-1-subcommand-2')) {
            const focused = interaction.options.getFocused(true);

            expectTypeOf(focused.name).toEqualTypeOf<'7-s1-s2-string'>();

            /** @ts-expect-error */
            interaction.options.get('7-s1-s1-integer');
        }


        if (isTyped.autocompleteSubcommand(interaction, '7-subgroup-2-subcommand-1')) {
            const focused = interaction.options.getFocused(true);

            expectTypeOf(focused.name).toEqualTypeOf<'7-s2-s1-string'>();

            /** @ts-expect-error */
            interaction.options.get('7-s1-s1-integer');
        }
    }
});

test('8-subgroup-subcommand-sibling', () => {
    if (isTyped.autocomplete(interaction, '8-subgroup-subcommand-sibling')) {
        /** interaction matches command */
        expectTypeOf(interaction).toEqualTypeOf<Command['8-subgroup-subcommand-sibling']>();
        /** interaction.commandName matches command.name */
        expectTypeOf(interaction.commandName).toEqualTypeOf<'8-subgroup-subcommand-sibling'>();
        /** interaction is callable with a function with params of the same TypedCommand*/
        expectTypeOf(commandFunc).toBeCallableWith(interaction);
        /** interaction is not callable with a function with params of a different TypedCommand */
        expectTypeOf<Parameters<FailsafeFunction>[0]>().not.toMatchTypeOf(interaction);

        /** interaction.options.getFocused is not callable */
        /** @ts-expect-error */
        interaction.options.getFocused(true);
        /** interaction.options.get('...') is not callable */
        /** @ts-expect-error */
        interaction.options.get('8-s1-s1-integer');
    }

    function commandFunc(interaction: Command['8-subgroup-subcommand-sibling']) {
        if (isTyped.autocompleteSubcommand(interaction, '8-subgroup-1-subcommand-1')) {
            const focused = interaction.options.getFocused(true);
            expectTypeOf(focused.name).toEqualTypeOf<'8-s1-s1-string'>();

            /** @ts-expect-error */
            interaction.options.get('8-sib-int');
        }

        if (isTyped.autocompleteSubcommand(interaction, '8-subgroup-1-subcommand-2')) {
            const focused = interaction.options.getFocused(true);
            expectTypeOf(focused.name).toEqualTypeOf<'8-s1-s2-string'>();

            /** @ts-expect-error */
            interaction.options.get('8-sib-int');

            interaction.options.get('8-s1-s2-integer');
        }

        if (isTyped.autocompleteSubcommand(interaction, '8-subcommand-sibling')) {
            const focused = interaction.options.getFocused(true);
            expectTypeOf(focused.name).toEqualTypeOf<'8-sib-str' | '8-sib-int'>();

            /** @ts-expect-error */
            interaction.options.get('8-s1-s1-integer');
        }
    }
});