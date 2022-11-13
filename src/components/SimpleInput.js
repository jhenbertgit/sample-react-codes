import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const regex = /\S+@\S+\.\S+/;

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && regex.test(enteredEmail.trim());
  const inputIsInvalid =
    !enteredNameIsValid && !enteredEmailIsValid && enteredNameTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== "") {
      return;
    }
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    if (event.target.value.trim() !== "") {
      return;
    }
  };

  const inputBlurHandler = (event) => {
    setEnteredNameTouched(true);

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
  };

  const inputClasses = inputIsInvalid ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredName}
        />
      </div>

      <div className={inputClasses}>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredEmail}
        />
      </div>

      {inputIsInvalid && (
        <p className="error-text">Please enter a valid entry</p> //user's feedback
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
