module.exports = {
  removeStepsByFields: async (redisClient, ...fields) => {
    try {
      console.log(fields)
      const steps = await redisClient.lRange('steps', 0, -1);

      const filteredSteps = steps.map(strStep => JSON.parse(strStep)).filter(step => {
        let stepStays = true
        for (let field of fields) {
          if (step[field.key] === field.value){
            stepStays = false
            break
          }
        }
        return stepStays
      });

      await redisClient.del('steps');

      // Add filtered messages back to the list
      for (const step of filteredSteps) {
        await redisClient.rPush('steps', JSON.stringify(step));
      }

      for (let field of fields) {
        console.log(`All steps with ${field.key} = ${field.value} are removed`)
      }
      return filteredSteps
    } catch (error) {
      console.error(error)
    }
  }
}