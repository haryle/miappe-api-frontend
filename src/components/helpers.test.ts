import {
  removeId,
  getTableDisplayKey,
  getFetcherKey,
  getSubmissionValue,
  getDefaultValue,
  getHiddenValue,
} from "./helpers";
import { describe, expect, test } from "vitest";
import { SchemaElementType, TypeLiterals } from "./types";

const removeIdFixture = [
  ["text", "investigation", "investigation"],
  ["text", "investigationId", "investigationId"],
  ["date", "investigationId", "investigationId"],
  ["select", "investigationId", "investigation"],
];

describe.each(removeIdFixture)(
  "given type %s and input %s",
  (inputType, inputValue, expValue) => {
    test(`removeId returns ${expValue}`, () => {
      expect(removeId(inputType as TypeLiterals, inputValue)).toEqual(expValue);
    });
  },
);

const getTableDisplayKeyFixture = [
  {
    inputValue: "",
    schema: { required: true, type: "select" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { required: true, type: "date" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { required: true, type: "text" },
    expValue: "",
  },
  {
    inputValue: "myInvestigation",
    schema: { required: true, type: "select" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "myInvestigation",
    schema: { required: true, type: "text" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "myInvestigation",
    schema: { required: true, type: "date" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "Project", required: true, type: "select" },
    expValue: "Project",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "Project", required: true, type: "text" },
    expValue: "Project",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "Project", required: true, type: "date" },
    expValue: "Project",
  },

  {
    inputValue: "investigationId",
    schema: { required: true, type: "select" },
    expValue: "Investigation",
  },
  {
    inputValue: "investigationId",
    schema: { required: true, type: "text" },
    expValue: "InvestigationId",
  },
  {
    inputValue: "investigationId",
    schema: { required: true, type: "date" },
    expValue: "InvestigationId",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "Project", required: true, type: "select" },
    expValue: "Project",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "Project", required: true, type: "text" },
    expValue: "Project",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "Project", required: true, type: "date" },
    expValue: "Project",
  },
];

describe.each(getTableDisplayKeyFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getTableDisplayKey returns ${expValue}`, () => {
      expect(
        getTableDisplayKey(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

const getFetcherKeyFixture = [
  {
    inputValue: "investigationId",
    schema: { required: true, type: "text" },
    expValue: "investigationId",
  },
  {
    inputValue: "investigationId",
    schema: { required: true, type: "date" },
    expValue: "investigationId",
  },
  {
    inputValue: "investigationId",
    schema: { required: true, type: "select" },
    expValue: "investigation",
  },

  {
    inputValue: "investigation",
    schema: { required: true, type: "text" },
    expValue: "investigation",
  },
  {
    inputValue: "investigation",
    schema: { required: true, type: "date" },
    expValue: "investigation",
  },
  {
    inputValue: "investigation",
    schema: { required: true, type: "select" },
    expValue: "investigation",
  },

  {
    inputValue: "institutionType",
    schema: { fetcherKey: "vocabulary", required: true, type: "text" },
    expValue: "vocabulary",
  },
  {
    inputValue: "institutionType",
    schema: { fetcherKey: "vocabulary", required: true, type: "date" },
    expValue: "vocabulary",
  },
  {
    inputValue: "institutionType",
    schema: { fetcherKey: "vocabulary", required: true, type: "select" },
    expValue: "vocabulary",
  },

  {
    inputValue: "investigationId",
    schema: { fetcherKey: "vocabulary", required: true, type: "text" },
    expValue: "vocabulary",
  },
  {
    inputValue: "investigationId",
    schema: { fetcherKey: "vocabulary", required: true, type: "date" },
    expValue: "vocabulary",
  },
  {
    inputValue: "investigationId",
    schema: { fetcherKey: "vocabulary", required: true, type: "select" },
    expValue: "vocabulary",
  },
];

describe.each(getFetcherKeyFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getFetcherKey returns ${expValue}`, () => {
      expect(
        getFetcherKey(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

const getSubmissionValueFixture = [
  {
    inputValue: "",
    schema: { required: true, type: "select" },
    expValue: null,
  },
  { inputValue: "", schema: { required: true, type: "date" }, expValue: null },
  { inputValue: "", schema: { required: true, type: "text" }, expValue: null },

  {
    inputValue: "2021-01-01",
    schema: { required: true, type: "date" },
    expValue: new Date("2021-01-01"),
  },
  {
    inputValue: "2021-01-01",
    schema: { required: true, type: "select" },
    expValue: "2021-01-01",
  },
  {
    inputValue: "2021-01-01",
    schema: { required: true, type: "text" },
    expValue: "2021-01-01",
  },
];

describe.each(getSubmissionValueFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getSubmissionValue returns ${expValue}`, () => {
      expect(
        getSubmissionValue(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

const getDefaultValueFixture = [
  {
    inputValue: "2021-11-11T00:00:00",
    schema: { required: true, type: "date" },
    expValue: "2021-11-11",
  },
  {
    inputValue: "2021-11-11T00:00:00",
    schema: { required: true, type: "text" },
    expValue: "2021-11-11T00:00:00",
  },
  {
    inputValue: "2021-11-11T00:00:00",
    schema: { required: true, type: "select" },
    expValue: "2021-11-11T00:00:00",
  },

  {
    inputValue: "",
    schema: { required: true, type: "date" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { required: true, type: "text" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { required: true, type: "select" },
    expValue: "",
  },
  {
    inputValue: null,
    schema: { required: true, type: "date" },
    expValue: "",
  },
  {
    inputValue: null,
    schema: { required: true, type: "text" },
    expValue: "",
  },
  {
    inputValue: null,
    schema: { required: true, type: "select" },
    expValue: "",
  },
];

describe.each(getDefaultValueFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getSubmissionValue returns ${expValue}`, () => {
      expect(
        getDefaultValue(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

const getHiddenValueFixture = [
  {
    inputValue: "id",
    schema: { type: "text", required: true },
    expValue: true,
  },
  {
    inputValue: "id",
    schema: { type: "select", required: true },
    expValue: true,
  },
  {
    inputValue: "id",
    schema: { type: "date", required: true },
    expValue: true,
  },

  {
    inputValue: "studyId",
    schema: { type: "text", required: true },
    expValue: false,
  },
  {
    inputValue: "studyId",
    schema: { type: "select", required: true },
    expValue: false,
  },
  {
    inputValue: "studyId",
    schema: { type: "date", required: true },
    expValue: false,
  },

  {
    inputValue: "id",
    schema: { hidden: false, type: "text", required: true },
    expValue: false,
  },
  {
    inputValue: "id",
    schema: { hidden: false, type: "select", required: true },
    expValue: false,
  },
  {
    inputValue: "id",
    schema: { hidden: false, type: "date", required: true },
    expValue: false,
  },

  {
    inputValue: "studyId",
    schema: { hidden: true, type: "text", required: true },
    expValue: true,
  },
  {
    inputValue: "studyId",
    schema: { hidden: true, type: "select", required: true },
    expValue: true,
  },
  {
    inputValue: "studyId",
    schema: { hidden: true, type: "date", required: true },
    expValue: true,
  },
];

describe.each(getHiddenValueFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getHiddenValue returns ${expValue}`, () => {
      expect(
        getHiddenValue(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);
