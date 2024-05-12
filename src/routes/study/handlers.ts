import { createHandlers, createLoaderAction } from "../../handlers";
import { StudyType, StudySchema } from "./study.types";

const INVESTIGATION_URL = "http://127.0.0.1:8000/study";

let schema: StudySchema = (await import("./data.json")).default;

const studyHandlers = createHandlers<StudyType>(INVESTIGATION_URL);

const LoaderAction = createLoaderAction<StudyType, "studyId">(
  studyHandlers,
  schema,
  "studyId",
  "/study",
  "/study",
  "/study"
);

export { LoaderAction as StudyActions };