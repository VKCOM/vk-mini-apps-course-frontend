import bridge from '@vkontakte/vk-bridge';

export const joinGroup = async (groupId: number) => {
  try {
    await bridge.send('VKWebAppJoinGroup', { group_id: groupId });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppJoinGroup:', err);
  }
};
