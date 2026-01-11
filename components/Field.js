import React from 'react';
import { getByPath } from '../utils/path';

export default function Field({ field, path, value, errors, onChange }) {
  if (field.type === 'group') {
    return (
      <fieldset className="group">
        <legend>{field.label}</legend>
        {field.fields?.map((child, idx) => {
          const childPath = `${path}.${child.name}`;
          return (
            <Field
              key={idx}
              field={child}
              path={childPath}
              value={getByPath(value, child.name)}
              errors={errors}
              onChange={onChange}
            />
          );
        })}
      </fieldset>
    );
  }

  const error = errors[path];

  const commonProps = {
    id: path,
    name: path,
    value: field.type === 'checkbox' ? undefined : value ?? '',
    onChange: (e) => {
      const val = field.type === 'checkbox' ? e.target.checked : e.target.value;
      onChange(path, val);
    }
  };

  return (
    <div className={`form-row ${error ? 'has-error' : ''}`}>
      <label htmlFor={path}>{field.label}{field.required ? ' *' : ''}</label>

      {renderInput(field, commonProps, value)}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

function renderInput(field, props, value) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
      return <input type={field.type} placeholder={field.placeholder || ''} {...props} />;
    case 'select':
      return (
        <select {...props}>
          <option value="">Select...</option>
          {field.options?.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      );
    case 'checkbox':
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={props.onChange}
          id={props.id}
          name={props.name}
        />
      );
    default:
      return <input type="text" {...props} />;
  }
}