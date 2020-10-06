# cdk-dynamodb-expression

## Synopsis

```typescript
import { dynamoExpr, dynamoAttrName } from "@aereal/cdk-dynamodb-expression";
import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";

const {
  expression,
  expressionAttributeNames,
  expressionAttributeValues,
} = dynamoExpr`SET ${dynamoAttrName(
  "Executing"
)} = ${DynamoAttributeValue.fromBoolean(true)}`;
expect(expression).toBe("SET #0 = :v1");
expect(expressionAttributeValues).toStrictEqual({
  ":v1": DynamoAttributeValue.fromBoolean(true),
});
expect(expressionAttributeNames).toStrictEqual({ "#0": "Executing" });
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
