import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { refCounter } from "./counter";

/**
 * Builds an expression and expression attribute values from template string.
 */
export const dynamoExpr = (
  literals: TemplateStringsArray,
  ...placeholers: DynamoAttributeValue[]
): [expr: string, values: { [key: string]: DynamoAttributeValue }] => {
  let expression = "";
  const vs: { [key: string]: DynamoAttributeValue } = {};
  placeholers.forEach((pv, idx) => {
    const { value } = refCounter.next();
    const ref = `:v${value}`;
    expression += literals[idx];
    expression += ref;
    vs[ref] = pv;
  });
  expression += literals[literals.length - 1];
  return [expression, vs];
};
