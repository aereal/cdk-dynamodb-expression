# cdk-dynamodb-expression

## Synopsis

```typescript
import { dynamoExpr } from "@aereal/cdk-dynamodb-expression";
import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";

const [
  expression,
  expressionAttributeValues,
] = dynamoExpr`SET Executing = ${DynamoAttributeValue.fromBoolean(true)}`;
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
