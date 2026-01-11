export function validateSchema(schema, values) {
  const errors = {};
  walkFields(schema.fields || [], '', values, errors);
  return { valid: Object.keys(errors).length === 0, errors };
}

function walkFields(fields, basePath, values, errors) {
  fields.forEach((f) => {
    const path = basePath ? `${basePath}.${f.name}` : f.name;
    if (f.type === 'group') {
      const groupVal = values?.[f.name] || {};
      walkFields(f.fields || [], path, groupVal, errors);
    } else {
      const val = values?.[f.name];
      if (f.required) {
        const isEmpty =
          f.type === 'checkbox' ? val !== true && val !== false && val !== 1 && val !== 0
          : val === '' || val === null || val === undefined;
        if (isEmpty) {
          errors[path] = `${f.label} is required`;
        }
      }
      if (f.type === 'email' && val) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(val)) errors[path] = 'Enter a valid email';
      }
      if (f.type === 'number' && val !== '' && val !== null && val !== undefined) {
        if (isNaN(Number(val))) errors[path] = 'Enter a valid number';
      }
    }
  });
}