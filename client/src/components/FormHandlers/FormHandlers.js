export const handleDynamicChange = (
  index,
  e,
  fieldName,
  formData,
  setFormData
) => {
  const { name, value } = e.target;
  const items = [...formData[fieldName]];
  items[index][name] = value;
  setFormData({ ...formData, [fieldName]: items });
};

export const handleAddItem = (fieldName, emptyItem, formData, setFormData) => {
  setFormData({
    ...formData,
    [fieldName]: [...formData[fieldName], emptyItem],
  });
};

export const handleRemoveItem = (index, fieldName, formData, setFormData) => {
  const items = [...formData[fieldName]];
  items.splice(index, 1);
  setFormData({ ...formData, [fieldName]: items });
};
