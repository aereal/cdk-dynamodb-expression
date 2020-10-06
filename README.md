# cdk-dynamodb-expression

## Synopsis

```typescript
import { dynamoAttrName, ExpressionBuilder } from "@aereal/cdk-dynamodb-expression";
import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";

const builder = new ExpressionBuilder();
const {
  expression,
  expressionAttributeValues,
} = builder.expr`SET Executing = ${DynamoAttributeValue.fromBoolean(true)}`;
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
