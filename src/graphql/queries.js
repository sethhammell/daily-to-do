/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      clientId
      taskName
      estimatedTime
      daysOfWeek {
        sunday
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
      }
      todoCompletionData {
        date
        completed
        timeSpent
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        taskName
        estimatedTime
        daysOfWeek {
          sunday
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
        }
        todoCompletionData {
          date
          completed
          timeSpent
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
