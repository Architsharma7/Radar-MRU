import { ActionSchema, SolidityType } from "@stackr/sdk";

export const mintSchema = new ActionSchema("mint", {
  address: SolidityType.ADDRESS,
  tokenMinted: SolidityType.ADDRESS,
  amountOfToken: SolidityType.UINT,
});

export const tokenSchema = new ActionSchema("token", {
  token: SolidityType.ADDRESS,
  criteriaCount: SolidityType.UINT,
  isSpam: SolidityType.BOOL,
});


export const schemas = {
  mint: mintSchema,
  token :tokenSchema
};
