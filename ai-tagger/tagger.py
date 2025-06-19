# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Allows requests from your frontend/backend

# # Very basic keyword-based tagging
# def tag_expense(description):
#     desc = description.lower()
#     if "grocery" in desc or "vegetables" in desc:
#         return "Groceries"
#     elif "uber" in desc or "ola" in desc or "taxi" in desc:
#         return "Transport"
#     elif "movie" in desc or "netflix" in desc:
#         return "Entertainment"
#     elif "rent" in desc or "apartment" in desc:
#         return "Rent"
#     elif "medic" in desc or "hospital" in desc:
#         return "Health"
#     else:
#         return "Uncategorized"

# @app.route("/tag", methods=["POST"])
# def tag():
#     data = request.get_json()
#     description = data.get("description", "")
#     category = tag_expense(description)
#     return jsonify({"category": category})

# if __name__ == "__main__":
#     app.run(port=5000)
