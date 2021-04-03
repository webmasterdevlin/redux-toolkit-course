import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/jhvjv",
});

export const EndPoints = {
  heroes: "heroes",
  antiHeroes: "anti-heroes",
  villains: "villains",
};
