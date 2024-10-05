import { check } from "express-validator";

export default {
  create: {
    validation: [check("notes", "Notes is required").notEmpty()],
  },
  update: {
    validation: [check("notes", "Notes Can't be Empty").optional().notEmpty()],
  },
};
