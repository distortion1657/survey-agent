from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from openai import OpenAI
import markdown
import os

_api_key = os.environ.get("OPENAI_API_KEY")
if not _api_key:
    raise RuntimeError(
        "OPENAI_API_KEY is not set. Add it to .env.local or export it in your shell."
    )
openai = OpenAI(api_key=_api_key)

@api_view(["GET"])
def aiResponse(request):
    rubric = """
Criteria 1
Contextual/Technical-  technical features as those dealing with the knowledge, financial, and activities (e.g., food) associated with the delivery of products, goods, or services. Contextual features which are the social, political, legal, ethical, geographical, carbon emissions, atmosphere, natural environment, and cultural environments within which the technical issues reside. 

IMPACT Definition & Meaning - Merriam-Webster 

The result of something on another thing. 

Could be one word to refer to an element. 

 

[T/C] 

T= Technical 

C= Contextual 

0: No response was provided or respondent was unable to identify a contextual or technical impact 

1: The impact(s) identified is only technical or only contextual (e.g., political, environmental, social, time, etc.) in scope                                              

2: Both technical and contextual aspects between impacts are identified

3: Respondent not only identifies both technical and contextual aspects, but also explains how they are interrelated/interconnected (e.g., how technical solutions create contextual trade-offs or synergies). Also arrows connecting one thing to another in a diagram. 

Criteria 2

Long term/ Short term 

    Statement involving short term or long-term timeframe 

    Must be explicitly stated e.g., in the future 

    Or within a month or beyond 

    May be Permanent/ Temporary Or Direct/ Indirect processes  

[L/S] 

L= Long Term 

S= Short Term 

 

0 No response was provided, or respondent did not identify any long term or short-term impacts 

1 Respondent identified either long term or short-term impact 

2 Respondent identified both long term and short-term impacts 

3 Respondent explicitly connects short-term and long-term impacts, showing how one evolves into or influences the other. 
   
Criteria 3

Global/Local 

    G-Beyond NY State/Philippines  

    Must state a geographical location 

    L = within NYS or a town 


[G/O] 

G= Global 

O= Local 

0 No response was provided, or respondent did not identify any global or local impacts 

1 Respondent identified either global or local impact 

2 Respondent identified both global and local impacts 

3 Respondent discusses how local impacts connect to global systems (or vice versa), showing scale-linkages.  
   
Criteria 3

Complexities/ Interactions 

    Complexity = 2 or more variables  

    Interaction = One variable affects another and vice versa 

[M/I] 

M= Complexities 

I= Interactions 

0 No response was provided, or respondent did not acknowledge any complexities or interactions between impacts 

1 Respondent complexity (could be two variables only)/an interaction between impacts 

2 Respondent identified interaction(s) and complexity/ complexities between impacts 

3 Respondent not only identifies multiple variables and interactions, but explains why the variables are interconnected e.g., feedback loops, cascading effects, or unintended consequences. 
 
 """
    content = f"""
        Here is the rubric: 
        {rubric}

        
        Scenario: In the Philippines, a town wants to install a large solar farm in a field that previously grew crops.
        Answer this: What's the impact (e.g., carbon emissions, pollution, ecosystems, etc.)? What are the impacts of the system on human health? What are the social impacts of the project? What are the local and global impacts on the environment? Are other systems involved? What are the short-term and long-term impacts on traffic, local businesses, and jobs?   
    """
    completion = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", 
            "content": "You are to respond to the questions asked by the user. You will be evaluated based on a rubric that the user submits."},
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
    return HttpResponse(html)



    