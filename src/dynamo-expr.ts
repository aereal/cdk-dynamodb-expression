import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { refCounter } from "./counter";

export interface ExpressionAggregate {
  /**
   * Built expression that contains calculated placeholders.
   */
  readonly expression: string;

  /**
   * attribute values that used to substitute expression's placeholders by DynamoDB.
   */
  readonly expressionAttributeValues: { [key: string]: DynamoAttributeValue };
}

/**
 * Builds an expression and expression attribute values from template string.
 */
export const dynamoExpr = (
  literals: TemplateStringsArray,
  ...placeholers: DynamoAttributeValue[]
): ExpressionAggregate => {
  let expression = "";
  const expressionAttributeValues: { [key: string]: DynamoAttributeValue } = {};
  placeholers.forEach((pv, idx) => {
    const { value } = refCounter.next();
    const ref = `:v${value}`;
    expression += literals[idx];
    expression += ref;
    expressionAttributeValues[ref] = pv;
  });
  expression += literals[literals.length - 1];
  return { expression, expressionAttributeValues };
};
