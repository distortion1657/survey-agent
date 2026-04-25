from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from openai import OpenAI
from base.models import AIResponse
import markdown
import os

_api_key = os.environ.get("OPENAI_API_KEY")
if not _api_key:
    raise RuntimeError(
        "OPENAI_API_KEY is not set. Add it to .env.local or export it in your shell."
    )
openai = OpenAI(api_key=_api_key)

@api_view(["GET"])
def getAIResponse(request):
    return HttpResponse(AIResponse.objects.get(id=1).response)
    
@api_view(["POST"])
def generateAIResponse(request):
    rubric = request.data.get("rubric")
    scenario = request.data.get("scenario")
    content = f"""
        Picture this.
        
        Scenario: 
        {scenario} 

        For each question, quote the question and answer it. You're supposed to answer like an Undergraduate student. 
    """
    completion = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", 
            "content": "You are to respond to the questions asked by the scneario provided to you. Respond whether you agree or disagree, and describe your reasong to do so fluently. You will be evaluated based on a rubric that the user submits."},
            {"role": "user", "content": content},
        ],
    )

    response_md = completion.choices[0].message.content or ""
    response_html = markdown.markdown(
        response_md,
        extensions=["fenced_code", "tables", "nl2br"],
    )
    html = f"""<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
            .md-content h1{{ font-size:1.5em; }} .md-content h2{{ font-size:1.3em; }}
            .md-content ul, .md-content ol{{ margin:0.5em 0; padding-left:1.5em; }}
            .md-content pre{{ background:#f5f5f5; padding:1em; overflow-x:auto; border-radius:4px; }}
            .md-content code{{ background:#f5f5f5; padding:0.2em 0.4em; border-radius:3px; }}
            .md-content table{{ border-collapse:collapse; }} .md-content th, .md-content td{{ border:1px solid #ddd; padding:0.4em 0.6em; }}
        </style>
    </head>
    <body>
    <h1>AI Response</h1>
    <div class="md-content">{response_html}</div>
    </body>
    </html>
    """
    a = AIResponse.objects.get(id=1)
    a.response = html
    a.save()
    return HttpResponse('Successfully generated')

# Code/Grade participant's responses by the AI using the rubric provided
def generateAIFeedback():
    

    