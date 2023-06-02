# discord.js typed commands

## About

Implements a type system that provides type-safety and intellisense for command names, subcommands, option types and option choices for the [discord.js library](https://github.com/discordjs/discord.js).

![](./assets/demo.gif)

## Table of Contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
  - [Accessing interaction options](#accessing-interaction-options)
  - [Use a specific command as function parameter](#use-a-specific-command-as-function-parameter)
  - [Use a specific subcommand as function parameter](#use-a-specific-subcommand-as-function-parameter)
- [Details](#details)
- [FAQ](#faq)
- [Todo](#todo)
- [Changelog](#changelog)

## Installation

Install the package via npm:

```bash
# npm
npm install discordjs-typed-commands
```

## Basic usage

Create a file where you define your `commands`. The `typed` function takes the command array as it's only parameter and returns a typed version of it, providing type safety and autocompletion for command interactions. Export it and use it elsewhere in your codebase.

**Important**: you must use `as const satisfies ReadonlyCommandList` for your `commands` array.

```ts
/* commands/_commands.ts */ 

import { typed } from 'discordjs-typed-commands';
import type { ReadonlyCommandList, TypedCommandList } from 'discordjs-typed-commands';

export const commands = [
    /* your command list goes here */
] as const satisfies ReadonlyCommandList;

export const isTyped = typed(commands);
export type Commands = TypedCommandList<typeof commands>;
```

**Note:**: you can name the function and the type in any way you want, don't have to use `isTyped` or `Commands`.

Import `isTyped` elsewhere in your project and use it down to narrow down your interactions:

```ts
// app.ts

import { isTyped } from './commands/_commands_.js';

discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'play')) {
        if (isTyped.subcommand(interaction, 'coin-toss')) {
            const coin = interaction.options.get('coin').value;
            /* 'heads' | 'tails' */
        }
    }

    else if (isTyped.command(interaction, 'greet')) {
        const user = interaction.options.get('user').user;
        /* User object */
    }
});
```

Also check out [the example directory](/example/).

## Details

The examples demonstrated below will assume you have a command list (`commands`) with the following structure:

```
commands
├─ greet
|  └─ user (o)
├─ play
|  └─ coinflip (s)
│     └─ coin (o)
|        ├─ heads (c)
|        └─ tails (c)
│  ├─ rock-paper-scissors (s)
|  |  └─ hand (o)
|  |     ├─ rock (c)
|  |     ├─ paper (c)
|  |     └─ scissors (c)

s = subcommand | o = option | c = choice
```

Defined like this:

**Important:** Do not copy paste commands from the code below as they are shortened for brevity. Full working demo is available at the [example directory](/example/commands/_commands.ts) if you need one.

```ts
/*
* commands/_commands.ts
* some parts skipped for brevity
*/
export const commands = [
    {
        name: 'greet',
        description: 'Greet a user.',
        options: [
            {
                name: 'user',
                type: ApplicationCommandOptionType.User,
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
                options: [
                    {
                        name: 'coin',
                        type: ApplicationCommandOptionType.String,
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
                options: [
                    {
                        name: 'hand',
                        type: ApplicationCommandOptionType.String,
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
```

### Accessing interaction options

To access the `interaction.options.get` method, first narrow down the interaction type, and then you will get editor autocomplete for all the options available for that command.

```ts
import { isTyped } from './commands/_commands_.js';

discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'greet')) {
        const user = interaction.options.get('user').user;
        /* User object */
    }
});
```

All `interaction.options` are accessed via the `get` method, so there is no need to use `getString`, `getBoolean`, `getUser` or other similar methods.

This is because our `command` list above is defined as an immutable array, so Typescript will be able to determine at compile time what kind of data structure each option has.

For example:

- The `greet` command `user` option would be inferred as a `User` object.

- The `play` command `coin-toss` subcommand `coin` option could be narrowed down to a string literal union of `'heads' | 'tails'`.

```ts
/* greet command */
const user = interaction.options.get('user').user;
user.username; /* string */
user.tag; /* string */

/* coin-toss subcommand */
const coin = interaction.options.get('choice').value;
coin; /* 'heads' | 'tails' */
```

**Important**: You will notice that if you narrow down the interaction to `play` and try to access it's options, Typescript you will give you an error:

```ts
discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'play')) {
        const coin = interaction.options.get('coin').value;
        /* Error: Argument of type  is not assignable to parameter of type never. */
    }
});
```

This is because our first command `greet` has no subcommands, so we are able to access it's options directly. But the `play` command has two subcommands, `coin-toss` and `rock-paper-scissors`, and so far we haven't done any checks to determine which type of subcommand our `interaction` holds.

Technically this piece of code probably won't crash your application, but it wouldn't make sense to try and access the `coin` option if our interaction subcommand is `rock-paper-scissors`. Likewise, it wouldn't make sense to access the `hand` option if the subcommand is `coin-toss`, it's always going to return `null` in both cases.

The solution is really simple, if your command has subcommands, narrow down the subcommand first:

```ts
discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'play')) {
        if (isTyped.subcommand(interaction, 'coin-toss')) {
            /* can now use interaction.options.get('...') */
            const coin = interaction.options.get('coin').value;
        }

        else if (isTyped.subcommand(interaction, 'rock-paper-scissors')) {
            /* can now use interaction.options.get('...') */
            const hand = interaction.options.get('hand').value;
        }
    }
});
```

In summary:

- If the command has any subcommands, narrow down which subcommand the `interaction` has.
- If the command has no subcommands, you can use `interaction.options.get('...')` directly.

The Discord API does not allow defining subcommands and options of basic type as siblings, so that makes things quite a bit easier.

### Use a specific command as function parameter:

You can define a specific command as a type, then use that type as a function parameter. This is useful if you want to pass down your interaction from one function to another.

```ts
/*
* commands/_commands.ts
* some parts skipped for brevity
*/
import { TypedCommandList, TypedCommand } from 'discordjs-typed-commands';

const commands = [ /* ... */ ] as const satisfies ReadonlyCommandList;

/* define a list of all TypedCommands */
type Commands = TypedCommandList<typeof commands>;
/* define a single TypedCommands */
type GreetCommand = TypedCommand<typeof commands, 'greet'>;

async function handleGreet(interaction: Commands['greet']) { /* ... */ }
/* or */
async function handleGreet(interaction: GreetCommand) { /* ... */ }

discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'greet')) {
        await handleGreet(interaction);
    }
});
```

### Use a specific subcommand as function parameter:

Similarly, you can do this for subcommands.

```ts
/*
* commands/_commands.ts
* some parts skipped for brevity
*/
import { TypedSubcommand } from 'discordjs-typed-commands';

const commands = [ /* ... */ ] as const satisfies ReadonlyCommandList;

type CoinTossSubcommand = TypedSubcommand<typeof commands, 'play', 'coin-toss'>;

async function handleCoinToss(interaction: GreetCommand) { /* ... */ }

discord.on(Events.InteractionCreate, async interaction => {
    if (isTyped.command(interaction, 'play')) {
        /* narrow down the subcommand first */
        if (isTyped.subcommand(interaction, 'coin-toss')) {
            await handleGreet(interaction); /* success! */
        }
        
    }
});
```

**Important**: in order to get editor autocomplete when defining a subcommand, supply the first parameter (`typeof commands`), then leave the last two as empty strings:

```ts
/* Define like this first: */
type ExampleSubcommand1 = TypedSubcommand<typeof commands, '', ''>;
/* Then you will get autocomplete for the 2nd and then the last generic parameters */
type ExampleSubcommand1 = TypedSubcommand<typeof commands, 'play', ''>;
type ExampleSubcommand1 = TypedSubcommand<typeof commands, 'play', 'coin-toss'>;

/* If you start writing this, autocomplete won't work: */
type ExampleSubcommand1 = TypedSubcommand<typeof commands, ''
/*                                    no autocomplete here ^
```

## FAQ

Q: **Does this package support CommonJS (require)**

A: Sorry, no, and there are no plans to. [Read more here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

Q: **How can I contribute?**

A: If you are typescript wizard (I am not) and you want to help improve this, you are more than welcome to do so, just submit an issue or a PR.

Q: **Can I use the `SlashCommandBuilder` that comes from discord.js?**

A: Unless there is a way for TypeScript to infer what the return type of `SlashCommandBuilder` you can't. But you could use it's `toJson` method, which serializes the builder to API-compatible JSON data, which then you can copy and paste as your command list.

Alternatively, you can make this part of your build process like this:

```ts
import { SlashCommandBuilder } from 'discord.js';
import { writeFile } from 'node:fs/promises';

const commands = [
    new SlashCommandBuilder().setName('echo').setDescription('Replies with your input!').toJSON(),
    new SlashCommandBuilder().setName('ping').setDescription('Pings!').toJSON(),
];

const output = `
import { typed } from 'discordjs-typed-commands';
import type { ReadonlyCommandList, TypedCommandList } from 'discordjs-typed-commands';

export const commands = ${JSON.stringify(commands, null, 4)} as const satisfies ReadonlyCommandList;

export const isTyped = typed(commands);
export type Commands = TypedCommandList<typeof commands>;
`;

await writeFile('./path/to/commands.ts', output);
```

## Todo

- [ ] **docs**: Improve docs
- [ ] **docs**: Provide internal docs
- [ ] **test**: Test support for yarn and pnpm
- [ ] **test**: Add husky hooks

## Changelog

Changelog can be found here: https://github.com/virtuallyunknown/discordjs-typed-commands/releases