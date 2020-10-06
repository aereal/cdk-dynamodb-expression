import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { dynamoAttrName } from "../src/attribute-name";
import { ExpressionBuilder } from "../src/dynamo-expr";

describe("dynamoExpr", () => {
  test("simple", () => {
    const builder = new ExpressionBuilder();
    const {
      expression,
      expressionAttributeValues,
    } = builder.expr`SET Executing = ${DynamoAttributeValue.fromBoolean(true)}`;
    expect(expression).toBe("SET Executing = :v0");
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
    });
  });

  test("multiple", () => {
    const builder = new ExpressionBuilder();
    const {
      expression,
      expressionAttributeValues,
    } = builder.expr`SET V1 = ${DynamoAttributeValue.fromBoolean(
      true
    )}, V2 = if_not_exists(V2, ${DynamoAttributeValue.fromNumber(10)})`;
    expect(expression).toBe("SET V1 = :v0, V2 = if_not_exists(V2, :v1)");
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
      ":v1": DynamoAttributeValue.fromNumber(10),
    });
  });

  test("names", () => {
    const builder = new ExpressionBuilder();
    const {
      expression,
      expressionAttributeNames,
      expressionAttributeValues,
    } = builder.expr`SET ${dynamoAttrName(
      "Executing"
    )} = ${DynamoAttributeValue.fromBoolean(true)}`;
    expect(expression).toBe("SET #0 = :v0");
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
    });
    expect(expressionAttributeNames).toStrictEqual({ "#0": "Executing" });
  });
});
