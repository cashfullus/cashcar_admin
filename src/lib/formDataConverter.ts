const formDataConverter = (data: any) => {
  const formData = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    const value = Number.isNaN(data[key]) ? 0 : data[key];
    if (key === 'default_mission_items') {
      return formData.append(key, JSON.stringify(data[key] || []));
    }
    if (key === 'additional_mission_items') {
      return formData.append(
        key,
        JSON.stringify(
          data[key].filter(
            (item: any) =>
              !Number.isNaN(item.additional_point) &&
              !Number.isNaN(item.based_on_activity_period) &&
              !Number.isNaN(item.due_date),
          ) || [],
        ),
      );
    }
    if (Array.isArray(value)) {
      value.forEach(v => {
        formData.append(key, v);
      });
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export default formDataConverter;
