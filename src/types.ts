import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";

export interface DynamoDBExpressionValue {
  readonly name: string;
  readonly value: DynamoAttributeValue;
}
