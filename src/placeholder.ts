import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoAttributeName } from "./attribute-name";

/**
 * The type that can be embedded in expression.
 */
export type Placeholder = DynamoAttributeName | DynamoAttributeValue;

/**
 * Currently Placeholder type is neither DynamoAttributeName of DynamoAttributeValue,
 * so we can assume the argument is a DynamoAttributeName by x is a string.
 *
 * @internal
 */
export const isAttrName = (x: Placeholder): x is DynamoAttributeName =>
  typeof x === "string";
