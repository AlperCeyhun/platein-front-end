import * as yup from "yup";

const SettingsHealthPreferencesSchema = yup.object().shape({
  gender: yup.string().required("Please select a gender"),
  age: yup
    .number()
    .required("Age is required")
    .min(13, "You must be at least 13 years old")
    .max(120, "Please enter a valid age"),
  height: yup
    .number()
    .required("Height is required")
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height must not exceed 250 cm"),
  weight: yup
    .number()
    .required("Weight is required")
    .min(30, "Weight must be at least 30 kg")
    .max(200, "Weight must not exceed 200 kg"),
  dailyMeals: yup
    .number()
    .min(1, "Daily meals is required")
    .required("Daily meals is required"),
  eatingStyle: yup
    .string()
    .matches(
      /^(I eat everything|Keto|Vegan|Vegetarian|Pescatarian|Other)$/,
      "Eating style is required"
    )
    .required("Eating style is required"),
  activityLevel: yup
    .number()
    .min(0.1, "Activity level is required")
    .required("Activity level is required"),
  healthConcerns: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one option")
    .required("Please select at least one option"),
  sleepingPattern: yup.string().required("Please select an option"),
  waterIntake: yup
    .number()
    .required("Please select an option")
    .typeError("Please select an option")
    .min(0, "Please select an option"),
});

export default SettingsHealthPreferencesSchema;
