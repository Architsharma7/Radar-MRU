import { ActionSchema, SolidityType } from "@stackr/sdk";

export const mintSchema = new ActionSchema("mint", {
  address: SolidityType.ADDRESS,
  tokenMinted: SolidityType.ADDRESS,
  amountOfToken: SolidityType.UINT,
});

// export const tokenSchemas = new ActionSchema("token", {
//   address: SolidityType.ADDRESS,
//   criteriaCount: SolidityType.ADDRESS,
//   amountOfToken: SolidityType.UINT,
// });

export const schemas = {
  mint: mintSchema
};
