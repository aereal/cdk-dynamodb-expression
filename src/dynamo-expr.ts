import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoAttributeName } from "./attribute-name";
import { namesRefCounter, refCounter } from "./counter";
import { Placeholder, isAttrName } from "./placeholder";

export interface ExpressionAggregate {
  /**
   * Built expression that contains calculated placeholders.
   */
  readonly expression: string;

  /**
   * attribute values that used to substitute expression's placeholders by DynamoDB.
   */
  readonly expressionAttributeValues: { [key: string]: DynamoAttributeValue };

  /**
   * attribute names that used to substitute expression's placeholders by DynamoDB.
   */
  readonly expressionAttributeNames: { [key: string]: DynamoAttributeName };
}

/**
 * Builds an expression and expression attribute values from template string.
 */
export const dynamoExpr = (
  literals: TemplateStringsArray,
  ...placeholers: Placeholder[]
): ExpressionAggregate => {
  let expression = "";
  const expressionAttributeValues: { [key: string]: DynamoAttributeValue } = {};
  const expressionAttributeNames: { [key: string]: DynamoAttributeName } = {};
  placeholers.forEach((pv, idx) => {
    if (isAttrName(pv)) {
      const { value } = namesRefCounter.next();
      const placeholder = `#${value}`;
      expression += literals[idx];
      expression += placeholder;
      expressionAttributeNames[placeholder] = pv;
    } else {
      const { value } = refCounter.next();
      const ref = `:v${value}`;
      expression += literals[idx];
      expression += ref;
      expressionAttributeValues[ref] = pv;
    }
  });
  expression += literals[literals.length - 1];
  return { expression, expressionAttributeValues, expressionAttributeNames };
};
