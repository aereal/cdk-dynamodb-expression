const brandSymbol = Symbol("dynamo-attribute-name");

/**
 * A phantom type to recognize the type is explicitly marked attribute name or not.
 */
export type DynamoAttributeName = string & { [brandSymbol]: never };

/**
 * mark `name` as DynamoAttributeName
 */
export const dynamoAttrName = (name: string): DynamoAttributeName =>
  name as DynamoAttributeName;
