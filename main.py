from flask import Flask, render_template, request, redirect
import jsonInteraction as jsi

app = Flask("Sigra Cybersecurity")

@app.route('/')
def index():

    lang = request.args.get('lang')

    if lang == "nl":
        return render_template('NL/index.html')
    else:
        return render_template('index.html')

@app.route('/learn')
def learn():
    
    lang = request.args.get('lang')

    if lang == "nl":
        return render_template('NL/learn.html')
    else:
        return render_template('learn.html')

@app.route('/test')
def test():
    
    lang = request.args.get('lang')

    if lang == "nl":
        return render_template('NL/test.html')
    else:
        return render_template('test.html')

@app.route('/checklist')
def checklist():
    
    lang = request.args.get('lang')

    if lang == "nl":
        return render_template('NL/checklist.html')
    else:
        return render_template('checklist.html')

@app.route('/contact')
def contact():
    
    lang = request.args.get('lang')

    formSuccess = request.args.get('success')
    if formSuccess == None: formSuccess = "false"

    if lang == "nl":
        return render_template('NL/contact.html', formSuccess=formSuccess)
    else:
        return render_template('contact.html', formSuccess=formSuccess)

@app.route('/contact-form', methods=['POST'])
def contactEndpoint():

    if request.method == "POST":

        data = request.form 

        jsi.writeToMessagesJson(data["email"], data["message"])

        if data["lang"] == "nl":
            return redirect(f'/contact?lang={data["lang"]}&success=true')
        else:
            return redirect(f'/contact?lang={data["lang"]}&success=true')

@app.route('/NIS2')
def nis2():
    
    lang = request.args.get('lang')

    if lang == "nl":
        return render_template('NL/NIS2.html')
    else:
        return render_template('NIS2.html')
    
@app.route('/test-score-process', methods=['GET'])
def processTestScore():

    score = request.args.get('score')
    
    percent = jsi.writeAndCompareScore(score)

    return {"topPercent": percent}

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)