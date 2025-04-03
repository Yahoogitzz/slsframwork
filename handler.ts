// import { DynamoDB } from 'aws-sdk';
// import { APIGatewayProxyHandler } from 'aws-lambda';

// const dynamoDb = new DynamoDB.DocumentClient();
// const tableName = process.env.DYNAMODB_TABLE!;

// export const create: APIGatewayProxyHandler = async (event) => {
//   const { id, name } = JSON.parse(event.body!);
  
//   const params = {
//     TableName: tableName,
//     Item: {
//       id,
//       name,
//     },
//   };

//   await dynamoDb.put(params).promise();

//   return {
//     statusCode: 201,
//     body: JSON.stringify({ id, name }),
//   };
// };

// export const read: APIGatewayProxyHandler = async (event) => {
//   const { id } = event.pathParameters!;
  
//   const params = {
//     TableName: tableName,
//     Key: { id },
//   };

//   const result = await dynamoDb.get(params).promise();
  
//   if (!result.Item) {
//     return {
//       statusCode: 404,
//       body: JSON.stringify({ message: "Item not found" }),
//     };
//   }

//   return {
//     statusCode: 200,
//     body: JSON.stringify(result.Item),
//   };
// };

// export const update: APIGatewayProxyHandler = async (event) => {
//   const { id } = event.pathParameters!;
//   const { name } = JSON.parse(event.body!);

//   const params = {
//     TableName: tableName,
//     Key: { id },
//     UpdateExpression: 'set #name = :name',
//     ExpressionAttributeNames: {
//       '#name': 'name',
//     },
//     ExpressionAttributeValues: {
//       ':name': name,
//     },
//     ReturnValues: 'ALL_NEW',
//   };

//   const result = await dynamoDb.update(params).promise();

//   return {
//     statusCode: 200,
//     body: JSON.stringify(result.Attributes),
//   };
// };

// export const deleteItem: APIGatewayProxyHandler = async (event) => {
//   const { id } = event.pathParameters!;
  
//   const params = {
//     TableName: tableName,
//     Key: { id },
//   };

//   await dynamoDb.delete(params).promise();

//   return {
//     statusCode: 204,
//     body: '',
//   };
// };


import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE!;

export const create: APIGatewayProxyHandler = async (event) => {
  try {
    const { id, name } = JSON.parse(event.body!);
  
    const params = {
      TableName: tableName,
      Item: {
        id,
        name,
      },
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ id, name }),
    };
  } catch (error) {
    console.error('Error creating item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const read: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters!;
  
    const params = {
      TableName: tableName,
      Key: { id },
    };

    const result = await dynamoDb.get(params).promise();
  
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error reading item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const update: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters!;
    const { name } = JSON.parse(event.body!);

    const params = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': name,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error updating item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const deleteItem: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters!;
  
    const params = {
      TableName: tableName,
      Key: { id },
    };

    await dynamoDb.delete(params).promise();

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    console.error('Error deleting item:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};


