import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoExpressionPlaceholder } from "./types";

/**
 * Builds an expression and expression attribute values from template string.
 */
export const dynamoExpr = (
  literals: TemplateStringsArray,
  ...placeholers: DynamoExpressionPlaceholder[]
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
