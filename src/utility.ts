import type { ChatInputApplicationCommandData } from 'discord.js';

import type {
    BaseCommand,
    BaseCommandList,
    CommandOptionAnyData,
    CommandOptionAutocompleteData,
    CommandOptionBasicData,
    CommandOptionSubcommandData,
    CommandOptionSubcommandOrGroupData,
    TypedAutocompleteCommand,
    TypedCommand
} from './index.js';

/**
 * For dev/debugging purposes
 * @see https://stackoverflow.com/a/57683652/3258251
 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type ExpandRecursively<T> = T extends object
    ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
    : T;

/**
 * Deeply nested immutable (readonly) array object remapper:
 * @see https://github.com/microsoft/TypeScript/issues/13923#issuecomment-557509399
 */
type ImmutablePrimitive = undefined | null | boolean | string | number | Function;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };
type Immutable<T> =
    T extends ImmutablePrimitive
    ? T
    : T extends Array<infer U>
    ? ImmutableArray<U>
    : ImmutableObject<T>;
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;

export type ReadonlyCommandList = ImmutableArray<ChatInputApplicationCommandData>;

export type TypedCommandList<T extends BaseCommandList> = {
    [K in T[number]['name']]: TypedCommand<T, K>
};

export type TypedAutocompleteList<T extends BaseCommandList, A extends AutocompleteCommands<T> = AutocompleteCommands<T>> = {
    [K in A[number]['name']]: TypedAutocompleteCommand<A, K>
};

/**
 * Make a property of an object required. Works well with intersections.
 * @see https://bobbyhadz.com/blog/typescript-make-property-required#make-an-optional-property-required-in-typescript
 */
export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

export type CommandWithOptions<T extends BaseCommand = BaseCommand> =
    T extends { options: ReadonlyArray<CommandOptionAnyData> }
    ? WithRequiredProperty<T, 'options'>
    : never;

export type CommandHasSubcommands<T extends ReadonlyArray<CommandOptionAnyData>> =
    T extends ReadonlyArray<infer Options extends CommandOptionAnyData>
    ? Options extends CommandOptionSubcommandData
    ? true
    : Options extends { options: ReadonlyArray<CommandOptionAnyData> }
    ? CommandHasSubcommands<Options['options']>
    : false
    : never;

export type PickBaseCommandByName<T extends BaseCommandList, K extends T[number]['name']> =
    T extends ReadonlyArray<infer Command>
    ? Command extends { name: K }
    ? Command
    : never
    : never;

export type PickCommandOptionByName<T extends CommandOptionBasicData, K extends T['name']> =
    T extends { name: K }
    ? T
    : never;

type ExtractBasicOption<T extends CommandOptionAnyData> = T extends CommandOptionBasicData ? T : never;
export type ExtractAutocompleteOption<T extends CommandOptionAnyData> = T extends CommandOptionAutocompleteData ? T : never;

type ExtractSubcommand<T extends CommandOptionAnyData> = T extends CommandOptionSubcommandData ? T : never;

export type ExtractCommandBasicOptions<T extends ReadonlyArray<CommandOptionAnyData>> =
    T extends ReadonlyArray<infer Options extends CommandOptionAnyData>
    ? Options extends { options: ReadonlyArray<CommandOptionAnyData> }
    ? ExtractCommandBasicOptions<Options['options']> | ExtractBasicOption<Options>
    : ExtractBasicOption<Options>
    : never;

export type ExtractCommandSubcommands<T extends ReadonlyArray<CommandOptionAnyData>> =
    T extends ReadonlyArray<infer Options extends CommandOptionAnyData>
    ? Options extends { options: ReadonlyArray<CommandOptionAnyData> }
    ? ExtractSubcommand<Options> | ExtractCommandSubcommands<Options['options']>
    : ExtractSubcommand<Options>
    : never;

export type ExtractSubcommandBasicOptions<T extends ReadonlyArray<CommandOptionAnyData>, K extends string> =
    T extends ReadonlyArray<infer Options>
    ? Options extends { name: K, type: 1, options: ReadonlyArray<CommandOptionBasicData> }
    ? Options['options'][number]
    : Options extends { options: ReadonlyArray<CommandOptionAnyData> }
    ? ExtractSubcommandBasicOptions<Options['options'], K>
    : never
    : never;

type HasAutocompleteData<T extends ReadonlyArray<CommandOptionAnyData>> = {
    [K in keyof T]: T[K] extends { autocomplete: true } ? T[K] : never;
} extends ReadonlyArray<never> ? false : true;

type FilterNeverOptions<T> = T extends { options: ReadonlyArray<never> } ? never : T;

type FilterAutocompleteOptions<T> =
    T extends { options: ReadonlyArray<CommandOptionBasicData> }
    ? HasAutocompleteData<T['options']> extends true
    ? T
    : never
    : T extends { options: ReadonlyArray<CommandOptionAnyData> }
    ? T extends { options: infer Options extends ReadonlyArray<CommandOptionSubcommandOrGroupData> }
    ? FilterNeverOptions<Omit<T, 'options'> & { options: AutocompleteCommands<Options> }>
    : never
    : never;

export type AutocompleteCommands<T extends BaseCommandList> = {
    [K in keyof T]: FilterAutocompleteOptions<T[K]>
};
