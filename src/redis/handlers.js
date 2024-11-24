module.exports = {
  removeStepsByField: async (redisClient, field) => {
    try {
      const actions = await redisClient.lRange('steps', 0, -1);

      const filteredActions = actions.filter(stringifiedAction => {
        const action = JSON.parse(stringifiedAction);
        return action[field.key] !== field.value;
      });

      await redisClient.del('steps');

      // Add filtered messages back to the list
      for (const action of filteredActions) {
        await redisClient.rPush('steps', action);
      }
      console.log(`All steps with ${field.key} = ${field.value} are removed`)
    } catch (error) {
      console.error(error)
    }
  }
}