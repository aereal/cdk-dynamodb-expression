import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoDBExpressionValue } from "./types";

export const dynamoExpr = (
  literals: TemplateStringsArray,
  ...placeholers: DynamoDBExpressionValue[]
): [expr: string, values: { [key: string]: DynamoAttributeValue }] => {
  let expression = "";
  const vs: { [key: string]: DynamoAttributeValue } = {};
  placeholers.forEach((pv, idx) => {
    const ref = `:${pv.name}`;
    expression += literals[idx];
    expression += ref;
    vs[ref] = pv.value;
  });
  expression += literals[literals.length - 1];
  return [expression, vs];
};
