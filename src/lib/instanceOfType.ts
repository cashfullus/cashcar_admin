import { RootData } from 'types/common';

const instanceOfType = <T>(obj: any, discriminator: RootData['discriminator']): obj is T => {
  return obj.discriminator === discriminator;
};

export default instanceOfType;
