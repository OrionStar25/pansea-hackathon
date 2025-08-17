# Historical Image Analysis Chatbot

This Streamlit application compares historical image analysis between GPT-4o and SEA-LION models for Singaporean historical photographs.

## Features

- 🖼️ Display historical images
- 🤖 Generate analysis using SEA-LION-v3-8B model
- 📊 Compare responses between GPT-4o and SEA-LION
- 🏛️ Specialized prompts for Singapore's architectural and urban history

## Setup

1. Activate your conda environment:
   ```bash
   conda activate pansea
   ```

2. Install dependencies (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Streamlit app:
   ```bash
   streamlit run app_demo.py
   ```

## Usage

1. The app will automatically load:
   - `metadata.txt` - Location and date information
   - `gpt-4o_output.md` - GPT-4o's analysis
   - `sealion_prompt.md` - Prompt template for SEA-LION

2. Click "Generate SEA-LION Analysis" to get the model's response

3. Compare the responses in the different tabs:
   - **Comparison**: Key differences between models
   - **GPT-4o Response**: Original GPT-4o analysis
   - **SEA-LION Response**: Generated SEA-LION analysis

## Files Required

- `main.py` - Main Streamlit application
- `metadata.txt` - Image metadata (location, date)
- `gpt-4o_output.md` - GPT-4o analysis
- `sealion_prompt.md` - SEA-LION prompt template
- Image file (any .png, .jpg, .jpeg, .gif, .bmp format)

## Model Information

Uses the [aisingapore/Llama-SEA-LION-v3-8B](https://huggingface.co/aisingapore/Llama-SEA-LION-v3-8B) model from Hugging Face, specifically fine-tuned for Southeast Asian contexts.
