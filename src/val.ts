import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoDBExpressionValue } from "./types";

export const val = (
  name: string,
  value: DynamoAttributeValue
): DynamoDBExpressionValue => ({
  name,
  value,
});
