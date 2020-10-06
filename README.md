![CI][ci-badge]
[![NPM version][npm-badge]][npm]

# cdk-dynamodb-expression

[DynamoDB expression][ddb-expr] builder for [AWS CDK][aws-cdk].

## Synopsis

```typescript
import { dynamoAttrName, ExpressionBuilder } from "@aereal/cdk-dynamodb-expression";
import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";

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

[ddb-expr]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.html
[aws-cdk]: https://github.com/aws/aws-cdk
[ci-badge]: https://github.com/aereal/cdk-dynamodb-expression/workflows/CI/badge.svg?branch=main
[npm-badge]: https://img.shields.io/npm/v/@aereal/cdk-dynamodb-expression
[npm]: https://www.npmjs.com/package/@aereal/cdk-dynamodb-expression
