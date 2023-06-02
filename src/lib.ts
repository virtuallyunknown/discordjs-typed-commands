import {
    ChatInputCommandInteraction
} from 'discord.js';

import type {
    Interaction,
    CacheType
} from 'discord.js';

import type {
    BaseCommand,
    BaseCommandList,
    CommandWithOptions,
    TypedCommandOptionsResolver,
    NeverResolver,
    PickBaseCommandByName,
    ExtractCommandSubcommands,
    ExtractCommandBasicOptions,
    ExtractSubcommandBasicOptions,
    CommandHasSubcommands
} from './index.js';

export declare class TypedCommandOptions<
    T extends BaseCommand
> extends ChatInputCommandInteraction<CacheType>{
    public commandName: T['name'];
    public options: CommandHasSubcommands<CommandWithOptions<T>['options']> extends true
        ? NeverResolver<ExtractCommandBasicOptions<CommandWithOptions<T>['options']>>
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

    return {
        command,
        subcommand
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
