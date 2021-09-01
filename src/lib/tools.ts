export const snakeKeysToCamelKeys = <T>(obj: object): T => {
  const oldKeys = Object.keys(obj);
  const newKeys = oldKeys.map(key => key.replace(/_\w/g, matched => matched[1].toUpperCase()));
  const newObj = newKeys.reduce((prev, key, idx) => {
    prev[key] = oldKeys[idx];
    return prev;
  }, {} as any);
  return newObj;
};

export const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const pointWithCommas = (x: number): string => {
  if (x < 0) {
    return numberWithCommas(x).replace('-', '- ');
  } else {
    return `+ ${numberWithCommas(x)}`;
  }
};

export const sumOfSpecificIndexAtArray = (arr: number[], idx: number): string => {
  const target = arr.slice(0, idx + 1);
  const sum = target.reduce((prev, cur) => prev + cur, 0);
  return pointWithCommas(sum);
};

export const minusOfSpecificIndexAtArray = (arr: number[], idx: number, page: number, count: number = 10): string => {
  const target = arr.slice(1, (page - 1) * count + idx + 1);
  const minus = target.reduce((prev, cur) => prev - cur, arr[0]);
  return pointWithCommas(minus);
};

const days = ['일', '월', '화', '수', '목', '금', '토'];
export const addDayAtDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const [date, time] = dateString.split(' ');
  const day = dateObj.getDay();
  return `${date}(${days[day]}) ${time}`;
};

export const numberWithHyphen = (x: string): string => {
  return x.replace(/\B(?=(\d{4})+(?!\d))/g, '-');
};

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

export const convertURLsToFiles = async (urls: string[]) => {
  const files = urls.map(url => convertURLtoFile(url));
  return Promise.all(files);
};

export const checkValidCoordination = (latitude?: number, longitude?: number) => {
  if (latitude === undefined || longitude === undefined) {
    return false;
  }
  const isValidLatitude = latitude > 90 ? false : latitude < -90 ? false : true;
  const isValidLongitude = longitude > 180 ? false : longitude < -180 ? false : true;
  return isValidLatitude && isValidLongitude;
};

const filterValueData = ['age', 'point'];
const filterDateData = ['register_time', 'recruit_time'];

const valueDataFormatter = (data: any) => {
  const copiedData = { ...data };
  filterValueData.forEach(key => {
    const minKey = `${key}_min_value`;
    const maxKey = `${key}_max_value`;
    if (!copiedData[minKey] && !copiedData[maxKey]) {
      delete copiedData[minKey];
      delete copiedData[maxKey];
      return;
    }
    const newValue = `${copiedData[minKey] || 0}~${copiedData[maxKey] || 1000}`;
    copiedData[key] = newValue;
    delete copiedData[minKey];
    delete copiedData[maxKey];
    return;
  });
  return copiedData;
};

const dateDataFormatter = (data: any) => {
  const copiedData = { ...data };
  filterDateData.forEach(key => {
    const startKey = `${key}_start_date`;
    const endKey = `${key}_end_date`;
    if (!copiedData[startKey] && !copiedData[endKey]) {
      delete copiedData[startKey];
      delete copiedData[endKey];
      return;
    }
    const startValue = `${copiedData[startKey] || '1970-01-01'} 00:00:00`;
    const endValue = `${copiedData[endKey] || '2070-12-31'} 23:59:59`;
    const newValue = `${startValue}~${endValue}`;
    copiedData[key] = newValue;
    delete copiedData[startKey];
    delete copiedData[endKey];
    return;
  });
  return copiedData;
};

export const filterDataFormatter = (data: any) => {
  const copiedData = { ...data };
  const keys = Object.keys(data);
  keys.forEach(key => {
    if (Array.isArray(data[key])) {
      if (key === 'gender') {
        const gender = data[key].length === 1 ? +data[key][0] : 0;
        copiedData[key] = gender;
        return;
      }
      copiedData[key] = data[key].join(',');
      return;
    }
  });
  keys.forEach(key => {
    if (!copiedData[key] || !copiedData[key].toString()) {
      delete copiedData[key];
    }
  });
  const firstStepData = valueDataFormatter(copiedData);
  const secondStepData = dateDataFormatter(firstStepData);
  return secondStepData;
};
