import { Field } from "formik";
import React from "react";
import { Input } from "antd";

const FormikInput = ({ name, label, type, required, icon, ...props }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <div>
              <label
                htmlFor={name}
                style={{ color: meta.touched && meta.error ? "red" : "black" }}
              >
                <strong>
                  {label}{" "}
                  {required ? <span style={{ color: "red" }}>*</span> : null}
                </strong>
              </label>
              <br />
              <br />
              <Input
                {...field}
                {...props}
                suffix={icon}
                style={{
                  padding: "10px",
                  borderRadius: "8px",

                  borderColor: meta.touched && meta.error ? "red" : "#252D3C",
                  ...props.style,
                }}
                type={type}
                id={name}
                value={meta.value}
                onChange={field.onChange}
              />

              {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>
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

export default FormikInput;
