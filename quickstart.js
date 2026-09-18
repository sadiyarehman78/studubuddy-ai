import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} from "@qvac/sdk";

async function main() {
  console.log("Loading QVAC model...");

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (progress) => {
      console.log(
        `Downloading: ${progress.percentage.toFixed(0)}%`
      );
    }
  });

  console.log("Model loaded!");

  const history = [
    {
      role: "user",
      content:
        "Explain TCP and UDP in simple terms for a computer science student."
    }
  ];

  const result = completion({
    modelId,
    history,
    stream: true
  });

  console.log("\nAI Response:\n");

  for await (const token of result.tokenStream) {
    process.stdout.write(token);
  }

  await unloadModel({ modelId });

  console.log("\n\nDone!");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});