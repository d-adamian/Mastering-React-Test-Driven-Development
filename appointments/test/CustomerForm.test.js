import React from "react";
import { fireEvent } from "@testing-library/dom";
import { createContainer } from "./domManipulators";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (name) => form("customer").elements[name];

  const labelFor = (formElement) =>
    container.querySelector(`label[for="${formElement}"]`);

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const itRendersAsATextBox = (fieldName) =>
    it("renders as a text box", () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName, value) => {
    it("includes the existing value", () => {
      render(<CustomerForm {...{ [fieldName]: value }} />);
      expect(field(fieldName).value).toEqual(value);
    });
  };

  const itRendersALabel = (fieldName, label) => {
    it("renders a label", () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });
  };

  const itAssignsAndIdThatMatchesLabel = (fieldName) => {
    it("assigns an id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };

  const itSavesExistingValueWhenSubmitted = (fieldName, value) => {
    it("saves existing value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );
      React.act(() => {
        fireEvent.submit(form("customer"));
      });
    });
  };

  const itSavesNewValueWhenSubmitted = (fieldName, updatedValue) => {
    it("saves new value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: "value" }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(updatedValue)}
        />
      );
      React.act(() => {
        fireEvent.change((() => field(fieldName))(), {
          target: { value: updatedValue, name: fieldName },
        });
        fireEvent.submit(form("customer"));
      });
    });
  };

  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });

  describe("First name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First name");
    itAssignsAndIdThatMatchesLabel("firstName");
    itSavesExistingValueWhenSubmitted("firstName", "Ashley");
    itSavesNewValueWhenSubmitted("firstName", "updatedValue");
  });

  describe("Last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Jones");
    itRendersALabel("lastName", "Last name");
    itAssignsAndIdThatMatchesLabel("lastName");
    itSavesExistingValueWhenSubmitted("lastName", "Jones");
    itSavesNewValueWhenSubmitted("lastName", "updatedValue");
  });

  describe("Phone number field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "012345");
    itRendersALabel("phoneNumber", "Phone number");
    itAssignsAndIdThatMatchesLabel("phoneNumber");
    itSavesExistingValueWhenSubmitted("phoneNumber", "012345");
    itSavesNewValueWhenSubmitted("phoneNumber", "123456");
  });

  it("Has a submit button", () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });
});
