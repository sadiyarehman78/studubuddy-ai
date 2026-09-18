import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} from "@qvac/sdk";

import readline from "node:readline/promises";
import {
  stdin as input,
  stdout as output
} from "node:process";

const rl = readline.createInterface({
  input,
  output
});

let modelId;

try {
  console.log("Loading QVAC model...");

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,

    onProgress: (progress) => {
      const percentage = progress.percentage.toFixed(0);

      if (process.stdout.isTTY) {
        process.stdout.write(`\rDownloading: ${percentage}%`);
      } else if (progress.percentage === 100) {
        console.log("Downloading: 100%");
      }
    }
  });

  console.log("\n\n✅ QVAC model loaded successfully!");
  console.log("📚 StudyBuddy Local AI is ready!");
  console.log("Ask me anything.");
  console.log("Type 'exit' to quit.\n");

  while (true) {
    const question = await rl.question("You: ");

    if (question.trim().toLowerCase() === "exit") {
      break;
    }

    if (!question.trim()) {
      console.log("Please enter a question.\n");
      continue;
    }

    const history = [
      {
        role: "system",
        content:
          "You are StudyBuddy, a helpful local AI study assistant. " +
          "Answer questions clearly and accurately. " +
          "Explain difficult concepts in simple language and use examples when useful."
      },
      {
        role: "user",
        content: question
      }
    ];

    console.log("\nStudyBuddy:");

    const result = completion({
      modelId,
      history,
      stream: true
    });

    for await (const token of result.tokenStream) {
      process.stdout.write(token);
    }

    console.log("\n");
  }
} catch (error) {
  console.error("\n❌ Error:", error);
} finally {
  rl.close();

  if (modelId) {
    await unloadModel({ modelId });
  }

  console.log("\nQVAC model unloaded.");
  console.log("Thanks for using StudyBuddy Local AI!");
}