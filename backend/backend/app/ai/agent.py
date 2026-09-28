from .rag import retrieve_context

def ask_agent(question: str):
    return {
        "answer": "AI agent scaffold is ready. Connect an LLM provider here for generated explanations.",
        "context": retrieve_context(question)
    }
