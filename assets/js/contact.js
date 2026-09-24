const REQUIRED_MESSAGES = {
  name: "Vul je naam in.",
  email: "Vul je e-mailadres in.",
  message: "Schrijf een bericht.",
};

const getErrorElement = (field) => {
  const errorId =
    field.getAttribute("aria-describedby");

  return errorId
    ? document.getElementById(errorId)
    : null;
};

const getErrorMessage = (field) => {
  const value = field.value.trim();

  if (field.required && value === "") {
    return (
      REQUIRED_MESSAGES[field.name] ??
      "Dit veld is verplicht."
    );
  }

  if (
    field.type === "email" &&
    field.validity.typeMismatch
  ) {
    return "Vul een geldig e-mailadres in.";
  }

  if (
    field.minLength > 0 &&
    value.length < field.minLength
  ) {
    return `Gebruik minimaal ${field.minLength} tekens.`;
  }

  return "";
};

const validateField = (field) => {
  const errorMessage =
    getErrorMessage(field);

  const errorElement =
    getErrorElement(field);

  const isValid =
    errorMessage === "";

  field.setAttribute(
    "aria-invalid",
    String(!isValid),
  );

  if (errorElement) {
    errorElement.textContent =
      errorMessage;
  }

  return isValid;
};

const validateForm = (fields) => {
  let firstInvalidField = null;

  for (const field of fields) {
    const isValid =
      validateField(field);

    if (
      !isValid &&
      !firstInvalidField
    ) {
      firstInvalidField = field;
    }
  }

  return firstInvalidField;
};

const setFormStatus = (
  statusElement,
  message,
  type = null,
) => {
  statusElement.textContent = message;

  statusElement.classList.remove(
    "form__status--success",
    "form__status--error",
  );

  if (type) {
    statusElement.classList.add(
      `form__status--${type}`,
    );
  }
};

const handleFieldBlur = (event) => {
  const field = event.currentTarget;

  validateField(field);
};

const handleFieldInput = (
  event,
  statusElement,
) => {
  const field = event.currentTarget;

  setFormStatus(statusElement, "");

  const wasInvalid =
    field.getAttribute("aria-invalid") ===
    "true";

  if (wasInvalid) {
    validateField(field);
  }
};

const handleSubmit = (
  event,
  fields,
  statusElement,
) => {
  event.preventDefault();

  const firstInvalidField =
    validateForm(fields);

  if (firstInvalidField) {
    setFormStatus(
      statusElement,
      "Controleer de gemarkeerde velden.",
      "error",
    );

    firstInvalidField.focus();
    return;
  }

  setFormStatus(
    statusElement,
    "Je invoer is geldig. De gegevens zijn niet verzonden.",
    "success",
  );
};

const initContactForm = () => {
  const form =
    document.querySelector(
      "#contact-form",
    );

  const statusElement =
    document.querySelector(
      "#form-status",
    );

  if (!form || !statusElement) {
    return;
  }

  const requiredFields =
    form.querySelectorAll("[required]");

  for (const field of requiredFields) {
    field.addEventListener(
      "blur",
      handleFieldBlur,
    );

    field.addEventListener(
      "input",
      (event) => {
        handleFieldInput(
          event,
          statusElement,
        );
      },
    );
  }

  form.addEventListener(
    "submit",
    (event) => {
      handleSubmit(
        event,
        requiredFields,
        statusElement,
      );
    },
  );
};

initContactForm();