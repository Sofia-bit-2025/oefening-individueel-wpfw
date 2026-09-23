const FIELD_ERROR_MESSAGES = {
  nameRequired: "Vul je naam in.",
  nameLength: "Gebruik minimaal 2 tekens voor je naam.",

  emailRequired: "Vul je e-mailadres in.",
  emailInvalid:
    "Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.",

  messageRequired: "Schrijf een bericht.",
  messageLength: "Gebruik minimaal 10 tekens voor je bericht.",
};

const getTrimmedValue = (field) => {
  return field.value.trim();
};

const getErrorElement = (field) => {
  const errorId = field.getAttribute("aria-describedby");

  if (!errorId) {
    return null;
  }

  return document.getElementById(errorId);
};

const showFieldError = (field, message) => {
  const errorElement = getErrorElement(field);

  field.setAttribute("aria-invalid", "true");

  if (errorElement) {
    errorElement.textContent = message;
  }
};

const clearFieldError = (field) => {
  const errorElement = getErrorElement(field);

  field.setAttribute("aria-invalid", "false");

  if (errorElement) {
    errorElement.textContent = "";
  }
};

const getNameError = (value) => {
  if (value.length === 0) {
    return FIELD_ERROR_MESSAGES.nameRequired;
  }

  if (value.length < 2) {
    return FIELD_ERROR_MESSAGES.nameLength;
  }

  return "";
};

const getEmailError = (field, value) => {
  if (value.length === 0) {
    return FIELD_ERROR_MESSAGES.emailRequired;
  }

  if (field.validity.typeMismatch) {
    return FIELD_ERROR_MESSAGES.emailInvalid;
  }

  return "";
};

const getMessageError = (value) => {
  if (value.length === 0) {
    return FIELD_ERROR_MESSAGES.messageRequired;
  }

  if (value.length < 10) {
    return FIELD_ERROR_MESSAGES.messageLength;
  }

  return "";
};

const getFieldError = (field) => {
  const value = getTrimmedValue(field);

  if (field.name === "name") {
    return getNameError(value);
  }

  if (field.name === "email") {
    return getEmailError(field, value);
  }

  if (field.name === "message") {
    return getMessageError(value);
  }

  return "";
};

const validateField = (field) => {
  const errorMessage = getFieldError(field);

  if (errorMessage) {
    showFieldError(field, errorMessage);
    return false;
  }

  clearFieldError(field);
  return true;
};

const validateForm = (form) => {
  const fields = form.querySelectorAll(".form__input");

  let isValid = true;
  let firstInvalidField = null;

  for (const field of fields) {
    const fieldIsValid = validateField(field);

    if (!fieldIsValid) {
      isValid = false;

      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    }
  }

  if (firstInvalidField) {
    firstInvalidField.focus();
  }

  return isValid;
};

const showFormStatus = (statusElement, message, type) => {
  statusElement.textContent = message;

  statusElement.classList.remove(
    "form__status--success",
    "form__status--error",
  );

  if (type === "success") {
    statusElement.classList.add("form__status--success");
  }

  if (type === "error") {
    statusElement.classList.add("form__status--error");
  }
};

const clearFormStatus = (statusElement) => {
  showFormStatus(statusElement, "", null);
};

const handleFieldInput = (event, statusElement) => {
  const field = event.currentTarget;

  clearFormStatus(statusElement);

  if (field.getAttribute("aria-invalid") === "true") {
    validateField(field);
  }
};

const handleSubmit = (event, statusElement) => {
  event.preventDefault();

  const form = event.currentTarget;

  clearFormStatus(statusElement);

  const isValid = validateForm(form);

  if (!isValid) {
    showFormStatus(
      statusElement,
      "Controleer de gemarkeerde velden.",
      "error",
    );

    return;
  }

  showFormStatus(
    statusElement,
    "Je invoer is geldig. De gegevens zijn niet verzonden.",
    "success",
  );
};

const initContactForm = () => {
  const form = document.querySelector("#contact-form");
  const statusElement = document.querySelector("#form-status");

  if (!form || !statusElement) {
    return;
  }

  const fields = form.querySelectorAll(".form__input");

  for (const field of fields) {
    field.addEventListener("input", (event) => {
      handleFieldInput(event, statusElement);
    });
  }

  form.addEventListener("submit", (event) => {
    handleSubmit(event, statusElement);
  });
};

initContactForm();