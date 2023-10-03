import { createApplicationCommandHandler, Permissions } from '@discordcf/framework';
import { commands } from './commands.js';

let applicationCommandHandler;

export default {
  fetch: async (request, env, context) => {
    applicationCommandHandler ??= createApplicationCommandHandler(
      {
        applicationId: env.DISCORD_APPLICATION_ID,
        publicKey: env.DISCORD_PUBLIC_KEY,
        botToken: env.DISCORD_TOKEN,
        commands,
        guildId: env.DISCORD_TEST_GUILD_ID,
        permissions: new Permissions(['SendMessages', 'UseApplicationCommands']),
      },
      env,
      context,
    );
    return applicationCommandHandler(request);
  },
};
