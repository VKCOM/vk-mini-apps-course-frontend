import bridge from '@vkontakte/vk-bridge';

export const joinGroup = async (groupId: number) =>
  await bridge.send('VKWebAppJoinGroup', { group_id: groupId });
