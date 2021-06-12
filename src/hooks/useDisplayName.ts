import { useState } from 'react';

const useDisplayName = (): [string, any, string, any] => {
  const key = 'chatroomsDisplayName';
  const localDisplayName = window.localStorage.getItem(key) || '';
  const [displayName, setDisplayName] = useState<string>('');
  const [displayNameInput, setDisplayNameInput] =
    useState<string>(localDisplayName);

  const newSetDisplayName = (displayName: string) => {
    window.localStorage.setItem(key, displayName);
    setDisplayName(displayName);
  };

  return [
    displayName,
    newSetDisplayName,
    displayNameInput,
    setDisplayNameInput,
  ];
};

export default useDisplayName;
