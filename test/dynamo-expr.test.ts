import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { refCounter } from "../src/counter";
import { dynamoExpr } from "../src/dynamo-expr";

describe("dynamoExpr", () => {
  beforeEach(() => {
    refCounter.next(true);
  });

  test("simple", () => {
    const {
      expression,
      expressionAttributeValues,
    } = dynamoExpr`SET Executing = ${DynamoAttributeValue.fromBoolean(true)}`;
    expect(expression).toBe("SET Executing = :v1");
    expect(expressionAttributeValues).toStrictEqual({
      ":v1": DynamoAttributeValue.fromBoolean(true),
    });
  });

  test("multiple", () => {
    const {
      expression,
      expressionAttributeValues,
    } = dynamoExpr`SET V1 = ${DynamoAttributeValue.fromBoolean(
      true
    )}, V2 = if_not_exists(V2, ${DynamoAttributeValue.fromNumber(10)})`;
    expect(expression).toBe("SET V1 = :v1, V2 = if_not_exists(V2, :v2)");
    expect(expressionAttributeValues).toStrictEqual({
      ":v1": DynamoAttributeValue.fromBoolean(true),
      ":v2": DynamoAttributeValue.fromNumber(10),
    });
  });
});
