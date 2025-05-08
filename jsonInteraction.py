import json

def writeToMessagesJson(email, message):

    file = open("./json/messages.json", "r")
    jsonData = json.load(file)
    file.close()

    data = {"email": email, "message": message}
    jsonData["messages"].append(data)

    with open('./messages.json', 'w') as outfile:
        json.dump(jsonData, outfile)

def compareScore(score, otherScores):

    scoresAmount = len(otherScores)

    if scoresAmount == 0:
        return 100

    otherScores.append(score)
    otherScores.sort()

    position = otherScores.index(score)

    topPercentage = (position/scoresAmount) * 100

    return topPercentage

def writeAndCompareScore(score):

    file = open("./json/scores.json", "r")
    jsonData = json.load(file)
    file.close()

    scores = jsonData["scores"]

    topPercent = compareScore(score, scores)

    jsonData["scores"].append(score)

    with open('./json/scores.json', 'w') as outfile:
        json.dump(jsonData, outfile)

    return topPercent