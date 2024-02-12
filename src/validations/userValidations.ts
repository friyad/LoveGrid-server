import * as yup from "yup";

export const LogInValidation = yup.object().shape({
  email: yup
    .string()
    .required("Please type your Email")
    .email("Invalid Email")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .lowercase(),

  password: yup
    .string()
    .required("Please type your Password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z]).+$/,
      "At least 1 Uppercase and 1 Lowercase"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least 1 number")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(
      /^(?=.*[!@#$%^&*()])/,
      "Password must contain at least 1 Special Character"
    ),
});

export const SignUpValidation = yup.object().shape({
  name: yup.string().required("Please type your name").lowercase(),
  email: yup
    .string()
    .required("Please type your Email")
    .email("Invalid Email")
    .lowercase()
    .matches(/^\S*$/, "Whitespace is not allowed"),
  password: yup
    .string()
    .required("Please type your Password")
    .min(8, "Password must be at least 8 characters")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z]).+$/,
      "At least 1 Uppercase and 1 Lowercase"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least 1 number")
    .matches(
      /^(?=.*[!@#$%^&*()])/,
      "Password must contain at least 1 Special Character"
    ),
});

export const OAuthValidation = yup.object().shape({
  name: yup.string().required("Please type your name").lowercase(),
  email: yup
    .string()
    .required("Please type your Email")
    .email("Invalid Email")
    .lowercase()
    .matches(/^\S*$/, "Whitespace is not allowed"),
  password: yup.string(),
  profile: yup.string(),
});
