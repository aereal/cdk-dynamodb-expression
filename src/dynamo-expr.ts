import { DynamoAttributeValue } from "@aws-cdk/aws-stepfunctions-tasks";
import { DynamoAttributeName } from "./attribute-name";
import { RefCounter, createRefCounter } from "./counter";
import { Placeholder, isAttrName } from "./placeholder";

type AttributeValues = { [key: string]: DynamoAttributeValue };

type AttributeNames = { [key: string]: DynamoAttributeName };

export interface ExpressionAggregate {
  /**
   * Built expression that contains calculated placeholders.
   */
  readonly expression: string;

  /**
   * attribute values that used to substitute expression's placeholders by DynamoDB.
   */
  readonly expressionAttributeValues: AttributeValues;

  /**
   * attribute names that used to substitute expression's placeholders by DynamoDB.
   */
  readonly expressionAttributeNames?: AttributeNames;
}

/**
 * An ExpressionBuilder instance builds the expression using calculated placeholders by referred attribute names and values.
 *
 * Each instance must correspond to the DynamoDB requests that using the expression.
 * If instances are used across different requests, the names and values that substitutes the placeholders may misplaced.
 */
export class ExpressionBuilder {
  private readonly valuesRefCounter: RefCounter;
  private readonly namesRefCounter: RefCounter;

  constructor() {
    this.valuesRefCounter = createRefCounter();
    this.namesRefCounter = createRefCounter();
  }

  /**
   * Builds an expression and expression attribute values from template string.
   */
  public expr(
    literals: TemplateStringsArray,
    ...placeholers: Placeholder[]
  ): ExpressionAggregate {
    let expression = "";
    const expressionAttributeValues: AttributeValues = {};
    const expressionAttributeNames: AttributeNames = {};
    placeholers.forEach((pv, idx) => {
      if (isAttrName(pv)) {
        const { value } = this.namesRefCounter.next();
        const placeholder = `#${value}`;
        expression += literals[idx];
        expression += placeholder;
        expressionAttributeNames[placeholder] = pv;
      } else {
        const { value } = this.valuesRefCounter.next();
        const ref = `:v${value}`;
        expression += literals[idx];
        expression += ref;
        expressionAttributeValues[ref] = pv;
      }
    });
    expression += literals[literals.length - 1];
    return {
      expression,
      expressionAttributeValues,
      expressionAttributeNames: compactObject(expressionAttributeNames),
    };
  }
}

const compactObject = <T extends { [key: string]: unknown }>(
  o: T
): T | undefined => (Object.keys(o).length === 0 ? undefined : o);
