import React, { useMemo, useState } from 'react';
import Field from './Field';
import { validateSchema } from '../utils/validation';
import { setByPath, getByPath } from '../utils/path';

export default function FormRenderer({ schema, onSubmit }) {
  const initialValues = useMemo(() => buildInitialValues(schema), [schema]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (path, value) => {
    setValues((prev) => setByPath({ ...prev }, path, value));
    // Clear error on change
    setErrors((prev) => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateSchema(schema, values);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  };

  return (
    <div>
      <h2>{schema?.title || 'Form'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        {schema?.fields?.map((field, idx) => (
          <Field
            key={idx}
            field={field}
            path={field.name}
            value={getByPath(values, field.name)}
            errors={errors}
            onChange={handleChange}
          />
        ))}
        <div className="actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => { setValues(initialValues); setErrors({}); }}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

function buildInitialValues(schema) {
  const obj = {};
  (schema?.fields || []).forEach((f) => {
    if (f.type === 'group') {
      obj[f.name] = buildInitialValues({ fields: f.fields });
    } else if (f.type === 'checkbox') {
      obj[f.name] = false;
    } else {
      obj[f.name] = '';
    }
  });
  return obj;
}