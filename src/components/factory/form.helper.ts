import { expect } from "vitest";
import { AbstractDataType, AbstractSchemaType } from "../../handlers";

interface TestType extends AbstractDataType {
  firstName: string;
  secondName: string;
  thirdName?: Date | string;
}

type TestSchemaType = AbstractSchemaType<TestType>;

const Schema: TestSchemaType = {
  title: { type: "text", required: true, placeholder: "title" },
  firstName: { type: "text", required: true, placeholder: "first item" },
  secondName: { type: "text", required: false, placeholder: "second item" },
  thirdName: { type: "date", required: true },
};

const TestInitData: TestType = {
  title: "title",
  firstName: "Hoang",
  secondName: "Son",
  thirdName: "Le",
};

const TestInitDataPartial: TestType = {
  title: "title",
  firstName: "Hoang",
  secondName: "Le",
};

const queryRenderedLabelGroup = (name: string) => {
  const input = document.querySelector(`input[name="${name}"]`);
  const label = document.querySelector(`label[for="${input!.id}"]`);
  return { input: input, label: label };
};

const queryInput = (name: string) => {
  return document.querySelector(`input[name="${name}"]`);
};

const testIsRendered = (name: string) => {
  return () => {
    const { input, label } = queryRenderedLabelGroup(name);
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  };
};

const testIsNotRendered = (name: string) => {
  return () => {
    const input = queryInput(name);
    expect(input).toBeNull();
  };
};

const Validator = {
  firstName: {
    isRendered: testIsRendered("firstName"),
    isNotRendered: testIsNotRendered("firstName"),
    isTypeText: () => {
      const input = queryInput("firstName");
      expect(input?.getAttribute("type")).toBe("text");
    },
    isRequired: () => {
      const input = queryInput("firstName");
      expect(input?.hasAttribute("required")).toBe(true);
    },
  },
  secondName: {
    isRendered: testIsRendered("secondName"),
    isNotRendered: testIsNotRendered("secondName"),
    isTypeText: () => {
      const input = queryInput("secondName");
      expect(input?.getAttribute("type")).toBe("text");
    },
    isNotRequired: () => {
      const input = queryInput("secondName");
      expect(input?.hasAttribute("required")).toBe(false);
    },
  },
  thirdName: {
    isRendered: testIsRendered("thirdName"),
    isNotRendered: testIsNotRendered("thirdName"),
    isTypeDate: () => {
      const input = queryInput("thirdName");
      expect(input?.getAttribute("type")).toBe("date");
    },
    isRequired: () => {
      const input = queryInput("thirdName");
      expect(input?.hasAttribute("required")).toBe(true);
    },
  },
  fourthName: {
    isRendered: () => {
      expect(queryInput("fourthName")).toBeInTheDocument();
    },
    isTypeSelect: () => {
      const input = queryInput("fourthName");
      expect(input!.getAttribute("type")).toBe("select");
    },
  },
};

export { Validator, Schema, TestInitData, TestInitDataPartial };
