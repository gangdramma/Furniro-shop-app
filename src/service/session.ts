import store2 from "store2";

export const session = {
  set: (token: string) => store2.set("Authorization", `Bearer ${token}`),
  get: () => store2.get("Authorization"),
  del: () => store2.remove("Authorization"),
};
