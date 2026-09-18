\# StudyBuddy Local AI 📚



A simple on-device AI study assistant powered by the \*\*Tether QVAC JavaScript SDK\*\*.



StudyBuddy Local AI uses the QVAC SDK to download and run a local Large Language Model directly on the user's computer. It generates study explanations without requiring a cloud-based AI API.



\---



\## 🚀 Features



\- Runs AI inference locally on the device

\- Uses the official `@qvac/sdk` JavaScript package

\- Loads the Llama 3.2 1B Instruct model

\- Generates explanations for computer science topics

\- Uses streaming AI responses

\- Does not require an OpenAI API key

\- Automatically unloads the model after completion

\- Designed as a lightweight local AI learning assistant



\---



\## 🧠 How It Works



The application follows this process:



1\. Initialize the QVAC SDK.

2\. Download the selected AI model if it is not already available.

3\. Load the model into memory.

4\. Send a study-related prompt to the model.

5\. Generate the response locally.

6\. Display the generated response in the terminal.

7\. Unload the model and close the QVAC runtime.



\### Application Flow



```text

User Prompt

&#x20;   ↓

QVAC SDK Initialization

&#x20;   ↓

Load Llama 3.2 1B Model

&#x20;   ↓

Local AI Inference

&#x20;   ↓

Streaming Response

&#x20;   ↓

Display Explanation

&#x20;   ↓

Unload Model

