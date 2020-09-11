import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";

/**
 * An expandable value that has name and value.
 * It will be built from {@link val} and treated as expandable value from {@link dynamoExpr}.
 */
export interface DynamoExpressionPlaceholder {
  /**
   * A placeholder name.
   */
  readonly name: string;

  /**
   * A value will be expanded.
   */
  readonly value: DynamoAttributeValue;
}
