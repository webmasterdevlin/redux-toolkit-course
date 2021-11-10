import { rest } from "msw";

const baseUrl = "http://localhost/api";

export const villainsFixture = [
  {
    firstName: "Lex",
    lastName: "Luther",
    house: "DC",
    knownAs: "Lex",
    id: "3290fhe",
  },
  {
    firstName: "Max",
    lastName: "Eisenhardt",
    house: "Marvel",
    knownAs: "Magneto",
    id: "6r8finlfy",
  },
];

export const villainHandler = [
  rest.get(`${baseUrl}/villains`, (req, res, ctx) => {
    return res(ctx.json(villainsFixture));
  }),

  rest.delete(`${baseUrl}/villains/:id`, (req, res, ctx) => {
    return villainsFixture.find((v) => v.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/villains`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put(`${baseUrl}/villains/:id`, (req, res, ctx) => {
    return villainsFixture.find((v) => v.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
