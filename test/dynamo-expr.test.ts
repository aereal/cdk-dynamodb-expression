import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { dynamoExpr } from "../src/dynamo-expr";
import { val } from "../src/val";

describe("dynamoExpr", () => {
  test("simple", () => {
    const {
      expression,
      values: expressionAttributeValues,
    } = dynamoExpr`SET Executing = ${val(
      "v1",
      DynamoAttributeValue.fromBoolean(true)
    )}`;
    expect(expression).toBe("SET Executing = :v1");
    expect(expressionAttributeValues).toStrictEqual({
      ":v1": DynamoAttributeValue.fromBoolean(true),
    });
  });

  test("multiple", () => {
    const {
      expression,
      values: expressionAttributeValues,
    } = dynamoExpr`SET V1 = ${val(
      "v1",
      DynamoAttributeValue.fromBoolean(true)
    )}, V2 = if_not_exists(V2, ${val(
      "v2",
      DynamoAttributeValue.fromNumber(10)
    )})`;
    expect(expression).toBe("SET V1 = :v1, V2 = if_not_exists(V2, :v2)");
    expect(expressionAttributeValues).toStrictEqual({
      ":v1": DynamoAttributeValue.fromBoolean(true),
      ":v2": DynamoAttributeValue.fromNumber(10),
    });
  });
});
