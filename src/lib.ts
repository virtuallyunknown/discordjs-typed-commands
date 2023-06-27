import {
    ChatInputCommandInteraction,
    AutocompleteInteraction
} from 'discord.js';

import type {
    Interaction,
    CacheType
} from 'discord.js';

import type {
    BaseCommand,
    BaseCommandList,
    CommandWithOptions,
    CommandHasSubcommands,
    TypedCommandOptionsResolver,
    TypedCommandOptionsNeverResolver,
    TypedAutocompleteOptionsResolver,
    TypedAutocompleteOptionsNeverResolver,
    PickBaseCommandByName,
    ExtractCommandSubcommands,
    ExtractCommandBasicOptions,
    ExtractSubcommandBasicOptions,
    AutocompleteCommands
} from './index.js';

export declare class TypedCommandOptions<
    T extends BaseCommand
> extends ChatInputCommandInteraction<CacheType>{
    public commandName: T['name'];
    public options: CommandHasSubcommands<CommandWithOptions<T>['options']> extends true
        ? TypedCommandOptionsNeverResolver<ExtractCommandBasicOptions<CommandWithOptions<T>['options']>>
        : TypedCommandOptionsResolver<ExtractCommandBasicOptions<CommandWithOptions<T>['options']>>;
}

export declare class TypedCommandSubcommandOptions<
    T extends BaseCommand,
    K extends ExtractCommandSubcommands<CommandWithOptions<T>['options']>['name']
> extends ChatInputCommandInteraction<CacheType> {
    private subcommandName: K;
    public commandName: T['name'];
    public options: TypedCommandOptionsResolver<ExtractSubcommandBasicOptions<CommandWithOptions<T>['options'], K>>;
}

export declare class TypedAutocompleteCommandOptions<
    T extends BaseCommand
> extends AutocompleteInteraction<CacheType> {
    public commandName: T['name'];
    public options: CommandHasSubcommands<CommandWithOptions<T>['options']> extends true
        ? TypedAutocompleteOptionsNeverResolver<ExtractCommandBasicOptions<CommandWithOptions<T>['options']>>
        : TypedAutocompleteOptionsResolver<ExtractCommandBasicOptions<CommandWithOptions<T>['options']>>;
}

export declare class TypedAutocompleteSubcommandOptions<
    T extends BaseCommand,
    K extends ExtractCommandSubcommands<CommandWithOptions<T>['options']>['name']
> extends AutocompleteInteraction<CacheType> {
    private subcommandName: K;
    public commandName: T['name'];
    public options: TypedAutocompleteOptionsResolver<ExtractSubcommandBasicOptions<CommandWithOptions<T>['options'], K>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function typed<T extends BaseCommandList = BaseCommandList>(commandList: T) {
    function command<
        K extends T[number]['name']
    >
        (interaction: Interaction, name: K): interaction is TypedCommand<T, K> {
        return interaction.isChatInputCommand() && interaction.commandName === name;
    }

    function subcommand<
        K extends T[number]['name'],
        S extends ExtractCommandSubcommands<CommandWithOptions<PickBaseCommandByName<T, K>>['options']>['name']
    >
        (interaction: TypedCommand<T, K>, name: S): interaction is TypedSubcommand<T, K, S> {
        return (interaction as TypedSubcommand<T, K, S>).options.getSubcommand() === name;
    }

    function autocomplete<
        A extends AutocompleteCommands<T>,
        K extends A[number]['name']
    >
        (interaction: Interaction, name: K): interaction is TypedAutocompleteCommand<A, K> {
        return interaction.isAutocomplete() && interaction.commandName === name;
    }

    function autocompleteSubcommand<
        A extends AutocompleteCommands<T>,
        K extends A[number]['name'],
        S extends ExtractCommandSubcommands<CommandWithOptions<PickBaseCommandByName<A, K>>['options']>['name']
    >
        (interaction: TypedAutocompleteCommand<A, K>, name: S): interaction is TypedAutocompleteSubcommand<A, K, S> {
        return (interaction as TypedAutocompleteSubcommand<A, K, S>).options.getSubcommand() === name;
    }

    return {
        command,
        subcommand,
        autocomplete,
        autocompleteSubcommand
    };
}

export type TypedCommand<
    T extends BaseCommandList,
    K extends T[number]['name']
> = TypedCommandOptions<PickBaseCommandByName<T, K>>;

export type TypedSubcommand<
    T extends BaseCommandList,
    K extends T[number]['name'],
    S extends ExtractCommandSubcommands<CommandWithOptions<PickBaseCommandByName<T, K>>['options']>['name']
> = TypedCommandSubcommandOptions<PickBaseCommandByName<T, K>, S>;

export type TypedAutocompleteCommand<
    T extends BaseCommandList,
    K extends T[number]['name']
> = TypedAutocompleteCommandOptions<PickBaseCommandByName<T, K>>;

export type TypedAutocompleteSubcommand<
    T extends BaseCommandList,
    K extends T[number]['name'],
    S extends ExtractCommandSubcommands<CommandWithOptions<PickBaseCommandByName<T, K>>['options']>['name']
> = TypedAutocompleteSubcommandOptions<PickBaseCommandByName<T, K>, S>;