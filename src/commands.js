import { InteractionResponseType } from '@discordcf/framework';

/** @type {import('@discordcf/framework').Command[]} */
export const commands = [
  {
    command: {
      name: 'test',
      description: 'test description',
    },
    handler: async ({ interaction, context, env }) => {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `👋 Hello ${interaction.structure.member.user.global_name}!`,
        },
      };
    },
  },
];
