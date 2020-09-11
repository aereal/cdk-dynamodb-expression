import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoExpressionPlaceholder } from "./types";

/**
 * Build a placeholder.
 */
export const val = (
  name: string,
  value: DynamoAttributeValue
): DynamoExpressionPlaceholder => ({
  name,
  value,
});
