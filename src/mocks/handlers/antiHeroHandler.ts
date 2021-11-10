import { rest } from "msw";

const baseUrl = "http://localhost/api";

export const antiHeroesFixture = [
  {
    id: "4893hfwuig",
    firstName: "Eddy",
    lastName: "Brock",
    house: "Marvel",
    knownAs: "Venom",
  },
  {
    id: "9greg7t767g",
    firstName: "Wade",
    lastName: "Wilson",
    house: "Marvel",
    knownAs: "Deadpool",
  },
];

export const antiHeroHandler = [
  rest.get(`${baseUrl}/anti-heroes`, (req, res, ctx) => {
    return res(ctx.json(antiHeroesFixture));
  }),

  rest.delete(`${baseUrl}/anti-heroes/:id`, (req, res, ctx) => {
    const antiHeroExist = antiHeroesFixture.find(
      (ah) => ah.id === req.params.id
    );
    return antiHeroExist ? res(ctx.status(200)) : res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/anti-heroes`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put(`${baseUrl}/anti-heroes/:id`, (req, res, ctx) => {
    console.log("ID:", req.params.id);

    return antiHeroesFixture.find((ah) => ah.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
