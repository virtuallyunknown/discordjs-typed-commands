import type {
    ApplicationCommandOptionType,
    ApplicationCommandOptionChoiceData,
    CommandInteractionOption,
    CommandInteractionOptionResolver,
    CacheType
} from 'discord.js';

import type {
    CommandOptionBasicData,
    CommandOptionBasicDataType,
    CommandOptionChoiceDataType,
    PickCommandOptionByName,
    AutocompleteCommands,
    ExtractAutocompleteOption,
    CommandOptionAutocompleteData
} from './index.js';

type BaseData<T extends CommandOptionBasicData> = { name: T['name'], type: T['type'] };

type NullableData<T extends CommandOptionBasicData> = T extends { required: true } ? CommandDataMapper<T> : CommandDataMapper<T> | null;

type StringData<T extends CommandOptionBasicData> =
    BaseData<T>
    & { value: CommandDataValueMapper<T> };

type NumberData<T extends CommandOptionBasicData> =
    BaseData<T>
    & { value: CommandDataValueMapper<T> };

type BooleanData<T extends CommandOptionBasicData> =
    BaseData<T>
    & { value: CommandDataValueMapper<T> };

type UserData<T extends CommandOptionBasicData> =
    BaseData<T>
    & Required<Pick<CommandInteractionOption, 'user'>>
    & { value: CommandDataValueMapper<T> };

type RoleData<T extends CommandOptionBasicData> =
    BaseData<T>
    & Required<Pick<CommandInteractionOption, 'role'>>
    & { value: CommandDataValueMapper<T> };

type MentionableData<T extends CommandOptionBasicData> =
    BaseData<T>
    & Pick<CommandInteractionOption, 'member' | 'role' | 'user'>
    & { value: CommandDataValueMapper<T> };

type AttachmentData<T extends CommandOptionBasicData> = BaseData<T>
    & Required<Pick<CommandInteractionOption, 'attachment'>>
    & { value: CommandDataValueMapper<T> };

type ChannelData<T extends CommandOptionBasicData> =
    BaseData<T>
    & Required<Pick<CommandInteractionOption, 'channel'>>
    & { value: CommandDataValueMapper<T> };

type CommandDataTypeMapper<T extends CommandOptionBasicDataType> =
    T extends
    | ApplicationCommandOptionType.Number
    | ApplicationCommandOptionType.Integer
    ? number
    : T extends ApplicationCommandOptionType.Boolean
    ? boolean
    : T extends
    | ApplicationCommandOptionType.String
    | ApplicationCommandOptionType.User
    | ApplicationCommandOptionType.Channel
    | ApplicationCommandOptionType.Role
    | ApplicationCommandOptionType.Mentionable
    | ApplicationCommandOptionType.Attachment
    ? string
    : never;

type CommandDataValueMapper<T extends CommandOptionBasicData> =
    T extends { choices: ReadonlyArray<ApplicationCommandOptionChoiceData> }
    ? T['type'] extends CommandOptionChoiceDataType
    ? T['choices'][number]['value']
    : CommandDataTypeMapper<T['type']>
    : CommandDataTypeMapper<T['type']>;

type CommandDataMapper<T extends CommandOptionBasicData> =
    T['type'] extends ApplicationCommandOptionType.String ? StringData<T>
    : T['type'] extends ApplicationCommandOptionType.Integer ? NumberData<T>
    : T['type'] extends ApplicationCommandOptionType.Boolean ? BooleanData<T>
    : T['type'] extends ApplicationCommandOptionType.User ? UserData<T>
    : T['type'] extends ApplicationCommandOptionType.Channel ? ChannelData<T>
    : T['type'] extends ApplicationCommandOptionType.Role ? RoleData<T>
    : T['type'] extends ApplicationCommandOptionType.Mentionable ? MentionableData<T>
    : T['type'] extends ApplicationCommandOptionType.Number ? NumberData<T>
    : T['type'] extends ApplicationCommandOptionType.Attachment ? AttachmentData<T>
    : T['type'] extends ApplicationCommandOptionType.Subcommand ? BaseData<T>
    : T['type'] extends ApplicationCommandOptionType.SubcommandGroup ? BaseData<T>
    : never;

/**
 * @note T extends T does not work here.
 */
type AutocompleteFocusedMapper<T extends CommandOptionAutocompleteData> = T extends any ? {
    name: T['name'];
    type: T['type'];
    value: string;
    focused: true;
} : never;

type AutocompleteDataMapper<T extends CommandOptionBasicData> = {
    name: T['name'];
    type: T['type'];
    value: string;
    focused?: true;
};

export interface TypedCommandOptionsResolver<T extends CommandOptionBasicData, S extends string = string> extends Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'> {
    get<K extends T['name']>(name: K): NullableData<PickCommandOptionByName<T, K>>;
    get<K extends T['name']>(name: K, required: true): CommandDataMapper<PickCommandOptionByName<T, K>>;
    get<K extends T['name']>(name: K, required?: boolean): CommandDataMapper<PickCommandOptionByName<T, K>>;
    getSubcommand(required?: true): S;
    getSubcommand(required: boolean): S | null;
}

export interface TypedCommandOptionsNeverResolver<T extends CommandOptionBasicData> extends Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'> {
    get<K extends T['name']>(name: never): NullableData<PickCommandOptionByName<T, K>>;
    get<K extends T['name']>(name: never, required: never): CommandDataMapper<PickCommandOptionByName<T, K>>;
    get<K extends T['name']>(name: never, required?: never): CommandDataMapper<PickCommandOptionByName<T, K>>;
}

export interface TypedAutocompleteOptionsResolver<T extends CommandOptionBasicData, S extends string = string> extends Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getUser' | 'getAttachment' | 'getChannel' | 'getMember' | 'getMentionable' | 'getRole'> {
    get<K extends T['name']>(name: K): AutocompleteDataMapper<PickCommandOptionByName<T, K>> | null;
    get<K extends T['name']>(name: K, required: true): AutocompleteDataMapper<PickCommandOptionByName<T, K>>;
    get<K extends T['name']>(name: K, required?: boolean): AutocompleteDataMapper<PickCommandOptionByName<T, K>> | null;
    getSubcommand(required?: true): S;
    getSubcommand(required: boolean): S | null;
    getFocused(getFull: true): AutocompleteFocusedMapper<ExtractAutocompleteOption<T>>;
    getFocused(getFull?: boolean): string;
}

export interface TypedAutocompleteOptionsNeverResolver<T extends CommandOptionBasicData> extends Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getUser' | 'getAttachment' | 'getChannel' | 'getMember' | 'getMentionable' | 'getRole'> {
    get<K extends T['name']>(name: never): AutocompleteDataMapper<PickCommandOptionByName<T, K>> | null;
    get<K extends T['name']>(name: never, required: never): AutocompleteDataMapper<PickCommandOptionByName<T, K>>;
    get<K extends T['name']>(name: never, required?: never): AutocompleteDataMapper<PickCommandOptionByName<T, K>> | null;
    getFocused(getFull: never): AutocompleteFocusedMapper<ExtractAutocompleteOption<T>>;
    getFocused(getFull?: never): string;
}