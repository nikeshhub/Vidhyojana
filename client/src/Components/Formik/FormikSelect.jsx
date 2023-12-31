//formik select component
import { Field } from 'formik';
import React from 'react';

const FormikSelect = ({ name, label, required, options, ...props }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          return (
            <div
              style={{
                margin: '20px',
              }}
            >
              <label
                htmlFor={name}
                style={{ color: meta.touched && meta.error ? 'red' : 'white' }}
              >
                <strong>{label}</strong>
                {required ? <span style={{ color: 'red' }}>*</span> : null}
              </label>
              <br />
              <br />
              <select
                {...field}
                {...props}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--dark-mode-border-color, #252D3C)',
                  background: 'var(--dark-mode-background-secondary, #1C1C24)',
                  borderColor: meta.touched && meta.error ? 'red' : '#252D3C',
                  color: 'white',
                  ...props.style,
                }}
                onChange={(e) => form.setFieldValue(name, e.target.value)}
                onBlur={() => form.setFieldTouched(name, true)}
                value={field.value}
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>
                  <i>{meta.error}</i>
                </div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default FormikSelect;