import streamlit as st
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from PIL import Image
import os

# Page config
st.set_page_config(
    page_title="Historical Image Analysis Chatbot",
    page_icon="🏛️",
    layout="wide"
)

@st.cache_resource
def load_model():
    """Load the SEA-LION model and tokenizer"""
    model_name = "aisingapore/Llama-SEA-LION-v3-8B"
    
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            device_map="auto",
            load_in_8bit=True  # Use quantization to reduce memory usage
        )
        return tokenizer, model
    except Exception as e:
        st.error(f"Error loading model: {str(e)}")
        return None, None

def load_files():
    """Load metadata, GPT output, and SEA-LION prompt template"""
    try:
        # Read metadata
        with open('metadata.txt', 'r') as f:
            metadata = f.read().strip()
        
        # Read GPT-4o output
        with open('gpt-4o_output.md', 'r') as f:
            gpt_output = f.read().strip()
        
        # Read SEA-LION prompt template
        with open('sealion_prompt.md', 'r') as f:
            prompt_template = f.read().strip()
        
        return metadata, gpt_output, prompt_template
    except FileNotFoundError as e:
        st.error(f"File not found: {str(e)}")
        return None, None, None

def create_sealion_prompt(metadata, gpt_output, prompt_template):
    """Insert metadata and GPT output into the SEA-LION prompt template"""
    
    # Extract location and date from metadata
    lines = metadata.split('\n')
    location = ""
    date = ""
    
    for line in lines:
        if line.startswith("Location:"):
            location = line.replace("Location:", "").strip()
        elif line.startswith("Date:"):
            date = line.replace("Date:", "").strip()
    
    # Replace placeholders in the prompt template
    filled_prompt = prompt_template.replace(
        "[Enter the known location of the photo here, e.g., South Bridge Road]", 
        location
    )
    filled_prompt = filled_prompt.replace(
        "[Enter the known or estimated date of the photo here, e.g., circa 1910]", 
        date
    )
    filled_prompt = filled_prompt.replace(
        "[Paste the AI-generated description of the photograph here]", 
        gpt_output
    )
    
    return filled_prompt

def generate_sealion_response(tokenizer, model, prompt):
    """Generate response from SEA-LION model"""
    if tokenizer is None or model is None:
        return "Model not available. Please check the model loading."
    
    try:
        # Tokenize input
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=4096)
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=1500,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract only the generated part (remove the input prompt)
        generated_text = response[len(prompt):].strip()
        
        return generated_text
    except Exception as e:
        return f"Error generating response: {str(e)}"

def highlight_differences(gpt_text, sealion_text):
    """Identify and highlight key differences between GPT and SEA-LION responses"""
    differences = []
    
    # Simple keyword-based analysis for demonstration
    gpt_keywords = set(gpt_text.lower().split())
    sealion_keywords = set(sealion_text.lower().split())
    
    unique_to_gpt = gpt_keywords - sealion_keywords
    unique_to_sealion = sealion_keywords - gpt_keywords
    
    if unique_to_gpt:
        differences.append(f"**Unique to GPT-4o:** {', '.join(list(unique_to_gpt)[:10])}")
    
    if unique_to_sealion:
        differences.append(f"**Unique to SEA-LION:** {', '.join(list(unique_to_sealion)[:10])}")
    
    return differences

def main():
    st.title("🏛️ Historical Image Analysis Chatbot")
    st.markdown("*Comparing GPT-4o and SEA-LION responses for historical Singaporean imagery*")
    
    # Load files
    metadata, gpt_output, prompt_template = load_files()
    
    if metadata is None:
        st.error("Could not load required files. Please ensure metadata.txt, gpt-4o_output.md, and sealion_prompt.md exist.")
        return
    
    # Sidebar with file contents
    with st.sidebar:
        st.header("📄 Source Files")
        
        with st.expander("Metadata"):
            st.text(metadata)
        
        with st.expander("GPT-4o Output (Preview)"):
            st.markdown(gpt_output[:500] + "..." if len(gpt_output) > 500 else gpt_output)
    
    # Main interface
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.header("🖼️ Historical Image")
        
        # Check if there's an image file in the directory
        image_files = [f for f in os.listdir('.') if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
        
        if image_files:
            try:
                image = Image.open(image_files[0])
                st.image(image, caption="Historical Singapore Image", use_column_width=True)
            except Exception as e:
                st.error(f"Could not load image: {str(e)}")
        else:
            st.info("No image file found in the directory. Please add an image file (.png, .jpg, etc.) to display the historical photograph.")
    
    with col2:
        st.header("🤖 AI Analysis Comparison")
        
        # Generate analysis button
        if st.button("🚀 Generate SEA-LION Analysis", type="primary"):
            with st.spinner("Loading SEA-LION model..."):
                tokenizer, model = load_model()
            
            if tokenizer and model:
                # Create the prompt
                sealion_prompt = create_sealion_prompt(metadata, gpt_output, prompt_template)
                
                with st.spinner("Generating SEA-LION analysis..."):
                    sealion_response = generate_sealion_response(tokenizer, model, sealion_prompt)
                
                # Store in session state
                st.session_state.sealion_response = sealion_response
                st.session_state.gpt_response = gpt_output
        
        # Display responses
        if hasattr(st.session_state, 'sealion_response'):
            tab1, tab2, tab3 = st.tabs(["📊 Comparison", "🤖 GPT-4o Response", "🦁 SEA-LION Response"])
            
            with tab1:
                st.subheader("📈 Key Differences")
                differences = highlight_differences(st.session_state.gpt_response, st.session_state.sealion_response)
                
                for diff in differences:
                    st.markdown(diff)
                
                # Response length comparison
                col_stats1, col_stats2 = st.columns(2)
                with col_stats1:
                    st.metric("GPT-4o Length", f"{len(st.session_state.gpt_response)} chars")
                with col_stats2:
                    st.metric("SEA-LION Length", f"{len(st.session_state.sealion_response)} chars")
            
            with tab2:
                st.markdown("### GPT-4o Analysis")
                st.markdown(st.session_state.gpt_response)
            
            with tab3:
                st.markdown("### SEA-LION Analysis")
                st.markdown(st.session_state.sealion_response)

if __name__ == "__main__":
    main()
