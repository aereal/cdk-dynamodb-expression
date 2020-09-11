# cdk-dynamodb-expression

## Synopsis

```typescript
const [
  expression,
  expressionAttributeValues,
] = dynamoExpr`SET Executing = ${val(
  "v1",
  DynamoAttributeValue.fromBoolean(true)
)}`;
expect(expression).toBe("SET Executing = :v1");
expect(expressionAttributeValues).toStrictEqual({
  ":v1": DynamoAttributeValue.fromBoolean(true),
});
```
