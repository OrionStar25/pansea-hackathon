import streamlit as st
from openai import OpenAI
from PIL import Image
import os

# Page config
st.set_page_config(
    page_title="Historical Image Analysis Chatbot",
    page_icon="🏛️",
    layout="wide"
)

# Custom CSS for styling
st.markdown("""
<style>
div.stButton > button:first-child {
    background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    transition: all 0.3s ease;
}
div.stButton > button:first-child:hover {
    background: linear-gradient(90deg, #FF5252, #26C6DA);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def get_client():
    """Initialize OpenAI client for Hugging Face inference"""
    try:
        # Read HF token from file
        with open('hf_token.txt', 'r') as f:
            hf_token = f.read().strip()
        
        client = OpenAI(
            base_url="https://router.huggingface.co/v1",
            api_key=hf_token,
        )
        return client
    except Exception as e:
        st.error(f"Error initializing client: {str(e)}")
        return None

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

def generate_sealion_response(client, prompt):
    """Generate response from SEA-LION model using Hugging Face inference API"""
    if client is None:
        return "Client not available. Please check the HF_TOKEN environment variable."
    
    try:
        completion = client.chat.completions.create(
            model="aisingapore/Llama-SEA-LION-v3-8B-IT:featherless-ai",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=1500,
            temperature=0.7,
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error generating response: {str(e)}"

def highlight_differences(gpt_text, sealion_text, client):
    """Use SEA-LION to identify and highlight key differences between GPT and SEA-LION responses"""
    if client is None:
        return ["Error: Client not available for difference analysis"]
    
    try:
        comparison_prompt = f"""You are an expert analyst. Please analyze and compare these two AI responses about the same historical Singapore image. Identify the key differences in:

1. **Content and Details**: What information is unique to each response?
2. **Historical Context**: How do they differ in historical interpretation?
3. **Cultural Insights**: What cultural perspectives are emphasized differently?
4. **Analytical Approach**: How do their analytical styles differ?

**GPT-4o Response:**
{gpt_text}

**SEA-LION Response:**
{sealion_text}

Please provide a structured comparison highlighting the most significant differences. Be specific and analytical."""

        completion = client.chat.completions.create(
            model="aisingapore/Llama-SEA-LION-v3-8B-IT:featherless-ai",
            messages=[
                {
                    "role": "user",
                    "content": comparison_prompt
                }
            ],
            max_tokens=1000,
            temperature=0.3,  # Lower temperature for more focused analysis
        )
        
        analysis = completion.choices[0].message.content
        return [analysis]
        
    except Exception as e:
        return [f"Error generating difference analysis: {str(e)}"]

def main():
    st.title("🏛️ Historical Image Analysis Chatbot")
    st.markdown("*Comparing GPT-4o and SEA-LION responses for historical Singaporean imagery*")
    
    # Load files
    metadata, gpt_output, prompt_template = load_files()
    
    if metadata is None:
        st.error("Could not load required files. Please ensure metadata.txt, gpt-4o_output.md, and sealion_prompt.md exist.")
        return
    
    # Main interface
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.header("🖼️ Historical Image")
        
        # Check if there's an image file in the directory
        image_files = [f for f in os.listdir('.') if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
        
        if image_files:
            try:
                image = Image.open(image_files[0])
                st.image(image, caption="Historical Singapore Image", use_container_width=True)
            except Exception as e:
                st.error(f"Could not load image: {str(e)}")
        else:
            st.info("No image file found in the directory. Please add an image file (.png, .jpg, etc.) to display the historical photograph.")
    
    with col2:
        st.header("🤖 AI Analysis Comparison")
        
        # Always show GPT response first (collapsible)
        with st.expander("🤖 GPT-4o Analysis", expanded=True):
            st.markdown(gpt_output)
        
        st.markdown("---")
        
        # Generate analysis button
        if st.button("🚀 Generate SEA-LION Analysis", type="primary"):
            with st.spinner("Initializing client..."):
                client = get_client()
            
            if client:
                # Create the prompt
                sealion_prompt = create_sealion_prompt(metadata, gpt_output, prompt_template)
                
                with st.spinner("Generating SEA-LION analysis..."):
                    sealion_response = generate_sealion_response(client, sealion_prompt)
                
                # Store in session state
                st.session_state.sealion_response = sealion_response
                st.session_state.gpt_response = gpt_output
                st.session_state.sealion_prompt = sealion_prompt
                st.session_state.client = client
        
        # Show new tabs after SEA-LION analysis is generated
        if hasattr(st.session_state, 'sealion_response'):
            tab1, tab2, tab3 = st.tabs(["Metadata", "�📝 SEA-LION Prompt", "🦁 SEA-LION Response"])
            
            with tab1:
                with st.expander("Image Metadata", expanded=True):
                    st.text(metadata)
            
            with tab2:
                with st.expander("�📝 Prompt sent to SEA-LION", expanded=False):
                    st.code(st.session_state.sealion_prompt, language="text")
            
            with tab3:
                with st.expander("🦁 SEA-LION Analysis", expanded=True):
                    st.markdown(st.session_state.sealion_response)
            
            st.markdown("---")
            
            # Generate detailed comparison button with nice styling
            if st.button("📊 Generate Detailed Comparison", 
                        help="Use SEA-LION to analyze differences between responses",
                        use_container_width=True):
                with st.spinner("Analyzing differences using SEA-LION..."):
                    if hasattr(st.session_state, 'client'):
                        differences = highlight_differences(
                            st.session_state.gpt_response, 
                            st.session_state.sealion_response, 
                            st.session_state.client
                        )
                        st.session_state.differences = differences
                    else:
                        st.session_state.differences = ["Error: Client not available for difference analysis"]
            
            # Show comparison results if generated
            if hasattr(st.session_state, 'differences'):
                with st.expander("📈 Detailed Analysis of Differences", expanded=True):
                    for diff in st.session_state.differences:
                        st.markdown(diff)
                    
                    # Response length comparison
                    col_stats1, col_stats2 = st.columns(2)
                    with col_stats1:
                        st.metric("GPT-4o Length", f"{len(st.session_state.gpt_response)} chars")
                    with col_stats2:
                        st.metric("SEA-LION Length", f"{len(st.session_state.sealion_response)} chars")

if __name__ == "__main__":
    main()
