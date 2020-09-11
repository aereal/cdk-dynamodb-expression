import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoDBExpressionValue } from "./types";

export interface DynamoDBExpression {
  readonly expression: string;
  readonly values: { [key: string]: DynamoAttributeValue };
}

export const dynamoExpr = (
  literals: TemplateStringsArray,
  ...placeholers: DynamoDBExpressionValue[]
): DynamoDBExpression => {
  let expression = "";
  const vs: { [key: string]: DynamoAttributeValue } = {};
  placeholers.forEach((pv, idx) => {
    const ref = `:${pv.name}`;
    expression += literals[idx];
    expression += ref;
    vs[ref] = pv.value;
  });
  expression += literals[literals.length - 1];
  return {
    expression,
    values: vs,
  };
};
