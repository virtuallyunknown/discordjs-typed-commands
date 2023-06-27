import type {
    ApplicationCommandOptionType,
    ApplicationCommandOptionChoiceData,
    ApplicationCommandSubGroup,
    ApplicationCommandSubCommand,
    ApplicationCommandBooleanOption,
    ApplicationCommandChannelOption,
    ApplicationCommandMentionableOption,
    ApplicationCommandNumericOption,
    ApplicationCommandRoleOption,
    ApplicationCommandStringOption,
    ApplicationCommandAttachmentOption,
    ApplicationCommandUserOption,
    ChatInputApplicationCommandData,
} from 'discord.js';

export type CommandOptionBasicDataType =
    ApplicationCommandOptionType.Attachment
    | ApplicationCommandOptionType.Boolean
    | ApplicationCommandOptionType.Channel
    | ApplicationCommandOptionType.Integer
    | ApplicationCommandOptionType.Mentionable
    | ApplicationCommandOptionType.Number
    | ApplicationCommandOptionType.Role
    | ApplicationCommandOptionType.String
    | ApplicationCommandOptionType.User;

export type CommandOptionChoiceDataType =
    ApplicationCommandOptionType.String
    | ApplicationCommandOptionType.Integer
    | ApplicationCommandOptionType.Number;

export type CommandOptionSubcommandData = Pick<ApplicationCommandSubCommand, 'name' | 'type'> & {
    options?: ReadonlyArray<CommandOptionBasicData>;
};

type CommandOptionSubcommandGroupData = Pick<ApplicationCommandSubGroup, 'name' | 'type'> & {
    options?: ReadonlyArray<CommandOptionSubcommandData>;
};

type CommandOptionNumericData = Pick<ApplicationCommandNumericOption, 'name' | 'type' | 'required'> & {
    choices?: ReadonlyArray<ApplicationCommandOptionChoiceData<number>>;
};

type CommandOptionStringData = Pick<ApplicationCommandStringOption, 'name' | 'type' | 'required'> & {
    choices?: ReadonlyArray<ApplicationCommandOptionChoiceData<string>>;
};

type AutocompleteOptionNumericData = Pick<ApplicationCommandNumericOption, 'name' | 'type' | 'required'> & {
    autocomplete: true;
};

type AutocompleteOptionStringData = Pick<ApplicationCommandStringOption, 'name' | 'type' | 'required'> & {
    autocomplete: true;
};

type CommandOptionChannelData = Pick<ApplicationCommandChannelOption, 'name' | 'type' | 'required'>;
type CommandOptionRoleData = Pick<ApplicationCommandRoleOption, 'name' | 'type' | 'required'>;
type CommandOptionUserData = Pick<ApplicationCommandUserOption, 'name' | 'type' | 'required'>;
type CommandOptionMentionableData = Pick<ApplicationCommandMentionableOption, 'name' | 'type' | 'required'>;
type CommandOptionBooleanData = Pick<ApplicationCommandBooleanOption, 'name' | 'type' | 'required'>;
type CommandOptionAttachmentOptionData = Pick<ApplicationCommandAttachmentOption, 'name' | 'type' | 'required'>;

export type CommandOptionBasicData =
    CommandOptionNumericData
    | CommandOptionStringData
    | CommandOptionChannelData
    | CommandOptionRoleData
    | CommandOptionUserData
    | CommandOptionMentionableData
    | CommandOptionBooleanData
    | CommandOptionAttachmentOptionData;

export type CommandOptionAnyData = CommandOptionBasicData | CommandOptionSubcommandData | CommandOptionSubcommandGroupData;
export type CommandOptionAutocompleteData = AutocompleteOptionNumericData | AutocompleteOptionStringData;
export type CommandOptionSubcommandOrGroupData = CommandOptionSubcommandData | CommandOptionSubcommandGroupData;

export type CommandBaseData = Pick<ChatInputApplicationCommandData, 'name'> & {
    options?: ReadonlyArray<CommandOptionAnyData>;
};

export type BaseCommandList = ReadonlyArray<CommandBaseData>;
export type BaseCommand = BaseCommandList[number];