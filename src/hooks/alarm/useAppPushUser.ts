import { useState } from 'react';

interface PushUserData {
  id: string | number;
  name: string;
}

const useAppPushUser = () => {
  const [appPushUser, setAppPushUser] = useState<PushUserData[]>([]);
  const togglePushUser = (data: PushUserData) => {
    const { id: userId } = data;
    setAppPushUser(prev => {
      const user = prev.find(({ id }) => id === userId);
      if (user !== undefined) {
        return prev.filter(({ id }) => id !== user.id);
      } else {
        return prev.concat(data);
      }
    });
  };
  const clearPushUserList = () => setAppPushUser([]);
  const selectPushUserList = (data: PushUserData[]) =>
    setAppPushUser(prev =>
      data.reduce((acc, cur) => {
        const index = prev.findIndex(d => d.id === cur.id);
        if (index === -1) {
          return acc.concat(cur);
        }
        return acc;
      }, prev),
    );
  const deselectPushUserList = (data: PushUserData[]) =>
    setAppPushUser(prev => prev.filter(({ id }) => !data.map(user => user.id).includes(id)));
  return { appPushUser, togglePushUser, selectPushUserList, deselectPushUserList, clearPushUserList };
};

export default useAppPushUser;
