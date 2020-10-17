import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { dynamoAttrName } from "../src/attribute-name";
import { ExpressionBuilder } from "../src/dynamo-expr";

describe("dynamoExpr", () => {
  test("not called", () => {
    const builder = new ExpressionBuilder();
    expect(() => builder.aggregate()).toThrowError(
      "Neither update nor condition called"
    );
  });

  test("simple", () => {
    const builder = new ExpressionBuilder();
    builder.update`SET Executing = ${DynamoAttributeValue.fromBoolean(true)}`;
    const {
      updateExpression,
      conditionExpression,
      expressionAttributeValues,
      expressionAttributeNames,
    } = builder.aggregate();
    expect(conditionExpression).toBeUndefined();
    expect(updateExpression).toBe("SET Executing = :v0");
    expect(expressionAttributeNames).toBeUndefined();
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
    });
  });

  test("simple condition", () => {
    const builder = new ExpressionBuilder();
    builder.condition`Executing = ${DynamoAttributeValue.fromBoolean(true)}`;
    const {
      updateExpression,
      conditionExpression,
      expressionAttributeValues,
      expressionAttributeNames,
    } = builder.aggregate();
    expect(conditionExpression).toBe("Executing = :v0");
    expect(updateExpression).toBeUndefined();
    expect(expressionAttributeNames).toBeUndefined();
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
    });
  });

  test("multiple", () => {
    const builder = new ExpressionBuilder();
    builder.update`SET V1 = ${DynamoAttributeValue.fromBoolean(
      true
    )}, V2 = if_not_exists(V2, ${DynamoAttributeValue.fromNumber(10)})`;
    const {
      updateExpression,
      conditionExpression,
      expressionAttributeNames,
      expressionAttributeValues,
    } = builder.aggregate();
    expect(conditionExpression).toBeUndefined();
    expect(updateExpression).toBe("SET V1 = :v0, V2 = if_not_exists(V2, :v1)");
    expect(expressionAttributeNames).toBeUndefined();
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
      ":v1": DynamoAttributeValue.fromNumber(10),
    });
  });

  test("names", () => {
    const builder = new ExpressionBuilder();
    builder.update`SET ${dynamoAttrName(
      "Executing"
    )} = ${DynamoAttributeValue.fromBoolean(true)}`;
    const {
      updateExpression,
      conditionExpression,
      expressionAttributeValues,
      expressionAttributeNames,
    } = builder.aggregate();
    expect(conditionExpression).toBeUndefined();
    expect(updateExpression).toBe("SET #0 = :v0");
    expect(expressionAttributeValues).toStrictEqual({
      ":v0": DynamoAttributeValue.fromBoolean(true),
    });
    expect(expressionAttributeNames).toStrictEqual({ "#0": "Executing" });
  });
});
