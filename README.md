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

## Installation

```
yarn add @aereal/cdk-dynamodb-expression
```

```
npm i -S @aereal/cdk-dynamodb-expression
```

## License

MIT License
